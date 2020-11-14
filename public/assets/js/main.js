$(document).ready(function () {
  // Initial set for the loading spinner.
  let loader = $(".loader").hide();
  let heading = $("#heading").empty(); // Title of each heading

  // Active class for recent jobs added menu section
  $(".btn").click(function () {
    $(".btn").removeClass("active");
    $(this).addClass("active");
  });

  // Mobil responsive on click bar.
  $(".movil-bar").click(function () {
    // The toggle() method toggles between hide() and show() for the selected elements.
    $("#links").toggle();
  });

  // validation form to submit all inputs. No inputs must be left blank.
  function validateForm() {
    let isValid = true;
    $(".form-control").each(function () {
      if ($(this).val() === "") {
        isValid = false;
      }
    });
    return isValid;
  }

  // Main Page
  // Searching for job title and State jobs
  $("#jobSearch").on("submit", function (event) {
    event.preventDefault();
    $("#heading").empty();
    loader.show();

    if (validateForm()) {
      const title = $("#jobTitle").val().trim();
      const state = $("#cityState").val().trim();

      // Target the title and state as parameters to receive the right data back. jobTitleKeywords function
      $.ajax(`/jobs/${title}/${state}`, { type: "GET" }).then(function (data) {
        $(".jobsList").hide(); // Will clear all results for new searches
        $("#jobTitle").val(""); // Will clear input
        $("#cityState").val(""); // Will clear input
        loader.hide();

        heading.html(`<h2>${title} jobs in ${state}</h2>`);
        let isAvail = false;
        let recentJobs = $("#jobs_added");
        const jobsArr = data.jobs;

        // Loop through the database to get the exact results for each job.
        jobsArr.forEach((element) => {
          // Refractor the code
          // Line 304 for more info
          let jobs = jobsData(element);
          isAvail = true;

          recentJobs.append(jobs);
        });

        // If no results available was found
        if (!isAvail) {
          // Open the model after the user submits and no results were found
          $("#validation-modal").modal("toggle");

          // Placed no heading in the html page
          heading.html(" ");
        }
      });
    } else {
      alert("Please fill out all fields before submitting!");
      loader.hide();
    }
  });

  // Employers Post HTML Section
  $("#employer-btn").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // When the job post was created. Giving it the day, month, and year for job_created
    const newDate = moment().format("YYYY-MM-DD");

    if (validateForm()) {
      let newJob = {
        company: $("#company-name").val().trim(),
        title: $("#job-title").val().trim(),
        state: $("#state").val().trim(),
        city: $("#city").val().trim(),
        salary: $("#salary").val().trim(),
        job_description: $("#job-desc").val().trim(),
        job_requirements: $("#job-req").val().trim(),
        applied_to: 0,
        job_created: newDate,
      };

      // Send the POST request.
      $.ajax("/jobs", {
        type: "POST",
        data: JSON.stringify(newJob),
        dataType: "json",
        contentType: "application/json",
      }).then(function () {
        // Open the model after the user submits
        $("#results-modal").modal("toggle");

        // Clear all the input fields after the user submits.
        $("#company-name").val("");
        $("#job-title").val("");
        $("#state").val("");
        $("#city").val("");
        $("#salary").val("");
        $("#job-desc").val("");
        $("#job-req").val("");
      });
    } else {
      alert("Please fill out all fields before submitting!");
    }
  });

  // Recent Jobs added btn -- will display all the recents jobs posted within 24 hours.
  $("#recent-btn").click(function (event) {
    event.preventDefault();
    loader.show();

    // Moment.js
    const currentDate = moment().format("YYYY-MM-DD");

    $.ajax("/jobs", { type: "GET" }).then((data) => {
      // Will clear all results for new searches
      $(".jobsList").remove();
      heading.html("<h2>New Jobs Added!</h2>");
      loader.hide();

      let recentJobs = $("#recent-jobs");
      let isAvail = false;
      const recentArr = data.jobs;

      // Loop through the database to get the exact results for each job.
      recentArr.forEach((element) => {
        let created = element.job_created; // Gives the moment().format date when a job was created
        let addedJob = created.slice(0, 10); // Gives the date the job was created (ex: 2020-01-09)

        // Line 276 for more info
        let jobs = jobsData(element);

        // If the new job post created equals the same time as the current date
        if (addedJob === currentDate) {
          recentJobs.append(jobs);
          isAvail = true; // Will alert that there's jobs available
        }
      });

      if (!isAvail) {
        heading.html("<h2>No Recent Jobs Added..</h2>");
        $("#recent-jobs-added-modal").modal("toggle");
      }
    });
  });

  // Jobs Applied btn - will show all the results of the jobs the user applied
  $("#applied-btn").on("click", function (event) {
    event.preventDefault();
    loader.show();

    $.ajax("/jobs/applied", { type: "GET" }).then((data) => {
      $(".jobsList").remove(); // Will clear all results for new searches
      loader.hide();
      heading.html("<h2>All Jobs Applied!</h2>");
      let appliedJobs = $("#applied-jobs");
      const jobsArr = data.jobs; // results of all jobs available in the database

      jobsArr.forEach((element) => {
        let jobs = `<div class='jobsList'>
          <h5 class='job_title'>${element.job_title}</h5>
          <h6 class='company_name'>${element.company_name}</h6>
          <p class='info'><i class='fas fa-map-marker-alt'></i>${element.job_city}, ${element.job_state} <br>
          <i class='fas fa-dollar-sign'></i> Salary: ${element.job_salary} <br>
          <i class='fas fa-clipboard'></i>${element.job_description} <br>
          <i class='fas fa-code'></i>${element.job_requirements}</p>
          <div><button id='delete' class='btn btn-danger' data-id='${element.id}'>Delete</button></div></div>`;

        appliedJobs.append(jobs);
      });
    });
  });

  // A GET request for all jobs available
  $("#available-btn").on("click", function (event) {
    event.preventDefault();
    $("#heading").empty();
    loader.show();

    $.ajax("/jobs/available", { type: "GET" }).then(function (data) {
      $(".jobsList").remove(); // Will clear all results for new searches
      heading.html("<h2>Jobs Available!</h2>");
      loader.hide();

      let availableJobs = $("#available-jobs"); // Checks for available jobs.
      const jobsArr = data.jobs; // Receiving data back from all the jobs

      // Loop through the database to get the exact results for each job.
      jobsArr.forEach((element) => {
        // Line 276 for more info
        let jobs = jobsData(element);
        availableJobs.append(jobs);
      });
    });
  });

  // Apply for a job btn
  $(document).on("click", ".applyJob", function (event) {
    event.preventDefault();
    // To target each job with it's own ID
    const jobId = $(this).data("id");

    // Once the user clicks apply change the status to true
    const appliedJob = $(this).data("apply") === true;

    // Once the user clicks apply change the text and the color of the btn.
    $(this).text("Applied!").addClass("btn btn-secondary");

    let newApplied = {
      applied_to: appliedJob,
    };

    $.ajax(`/jobs/${jobId}`, {
      type: "PUT",
      data: JSON.stringify(newApplied),
      dataType: "json",
      contentType: "application/json",
    }).then(function () {
      $("#recent-modal").modal("toggle");
    });
  });

  // Sending a request to the sever to delete a job post
  $(document).on("click", "#delete", function (event) {
    event.preventDefault();

    // This is going to target the selected ID
    const jobId = $(this).data("id");

    $.ajax(`/jobs/${jobId}`, { type: "DELETE" }).then(() => location.reload());
  });
}); // end of closing document.ready function

function jobsData(element) {
  return `<div class='jobsList'>
          <h5 class='job_title'>${element.job_title}</h5>
          <h6 class='company_name'>${element.company_name}</h6>
          <p class='info'><i class='fas fa-map-marker-alt'></i>${
            element.job_city
          }, ${element.job_state} <br>
          <i class='fas fa-clipboard'></i>${element.job_description} <br>
          <i class='fas fa-code'></i>${element.job_requirements}</p>
          <div><button class='applyJob appliedJob btn btn-primary' data-id='${
            element.id
          }' data-apply='${!element.applied_to}'>Apply</button></div></div>`;
}
