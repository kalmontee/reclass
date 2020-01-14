$(document).ready(function() {

    $('.movil-bar').on('click', function(event) {
        event.preventDefault();

        // Set a variable document to the header-items
        var headerItems = document.querySelector('.header-items');

        // if else statement to toggle the movil-bar
        headerItems.style.display === 'none' ? headerItems.style.display = 'block' : headerItems.style.display = 'none';
    });

    $("#jobSearch").on("submit", function(event) {
        event.preventDefault();
        $("#heading").empty();

        // Form validation for empty input field
        function validateForm() {
            var isValid = true;
            $(".form-control").each(function() {
                if ($(this).val() === "") {
                    isValid = false;
                }
            });
            return isValid;
        }

        if (validateForm()) {
            var title = $("#jobTitle").val().trim();
            var state = $("#cityState").val().trim();

            // "/addedJob" is coming from the ORM to get the specific request from the database. selectOne function
            $.ajax("/jobs/" + title + "/" + state, {
                type: "GET"

            }).then(function(data) {
                console.log(data);
                $('.jobsList').remove(); // Will clear all results for new searches
                $("#jobTitle").val(''); // Will clear input
                $("#cityState").val(''); // Will clear input

                var heading = $("#heading").html("<h2>Results for " + title + " in " + state + "</h2>");
                var isAvail = false;

                var recentJobs = $("#jobs_added");
                var jobsArr = data.jobs;
                var len = jobsArr.length; // The length of all data.jobs

                // Loop through the database to get the exact results for each job.
                for (var i = 0; i < len; i++) {
                    var jobs = "<div class='jobsList'>" +
                        "<h5 class='job_title'>" + jobsArr[i].job_title + "</h5>" +
                        "<h6 class='company_name'>" + jobsArr[i].company_name + "</h6>" +
                        "<p class='info'> <i class='fas fa-map-marker-alt '></i>" + jobsArr[i].job_city + ", " +
                        jobsArr[i].job_state + "<br>" +
                        "<i class='fas fa-dollar-sign'></i> " + "Salary: " + jobsArr[i].job_salary + "<br>" +
                        "<i class='fas fa-clipboard'></i>" + jobsArr[i].job_description + "<br>" +
                        "<i class='fas fa-code'></i>" + jobsArr[i].job_requirements + "</p>" +
                        "<div><button class='applyJob btn btn-primary' data-id='" + jobsArr[i].id + "' data-apply='" + !jobsArr[i].applied_to + "'>Apply"

                    if (!jobsArr[i].applied_to) {
                        recentJobs.append(jobs);
                        isAvail = true;

                    } else if (jobsArr[i].applied_to) {
                        // This will hide all the jobs that the user clicked to applied for any job.
                        $(this).hide();
                    }

                    jobs += "</button></div></div>";
                }

                // If no results available was found
                if (!isAvail) {
                    $("#validation-modal").modal("toggle");
                    // heading = $("#heading").html("<h2>No Results found for " + title + " in " + state + "</h2>");
                    heading = $("#heading").html(" ");
                }
            });

        } else {
            alert("Please fill out all fields before submitting!");
        }
    });

    // Employers Post HTML Section
    $("#employer-btn").on("click", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var newDate = moment().format("YYYY-MM-DD");

        function validateForm() {
            var isValid = true;
            $(".form-control").each(function() {
                if ($(this).val() === "") {
                    isValid = false;
                }
            });

            return isValid;
        }

        if (validateForm()) {
            var newJob = {
                company: $("#company-name").val().trim(),
                title: $("#job-title").val().trim(),
                state: $("#state").val().trim(),
                city: $("#city").val().trim(),
                salary: $("#salary").val().trim(),
                job_description: $("#job-desc").val().trim(),
                job_requirements: $("#job-req").val().trim(),
                applied_to: 0,
                job_created: newDate
            };

            // Send the POST request.
            $.ajax("/jobs", {
                type: "POST",
                data: JSON.stringify(newJob),
                dataType: "json",
                contentType: "application/json"
            }).then(function(data) {
                // Open the model after the user submits
                $("#results-modal").modal("toggle");

                // Clear all the input fields after the user submits.
                $("#company-name").val('');
                $("#job-title").val('');
                $("#state").val('');
                $("#city").val('');
                $("#salary").val('');
                $("#job-desc").val('');
                $("#job-req").val('');
            });
        } else {
            alert("Please fill out all fields before submitting!");

        }
    });

    // Recent btn -- will display all the recents jobs posted
    $("#recent-btn").click(function(event) {
        event.preventDefault();
        $("#heading").empty();

        // Moment.js
        var currentDate = moment().format("YYYY-MM-DD");

        $.ajax("/jobs", {
            type: "GET"

        }).then(function(data) {
            // Will clear all results for new searches
            $('.jobsList').remove();

            var recentJob = $("#recent-jobs");
            var recentArr = data.jobs
            var len = recentArr.length;
            var isAvail = false;
            var heading = $("#heading").html("<h2>New Jobs Added!</h2>");

            for (var i = 0; i < len; i++) {
                var created = recentArr[i].job_created; // Gives the moment().format when a job was created
                var addedJob = created.slice(0, 10); // Gives the date the job was created (ex: 2020-01-09)

                var createdJob = "<div class='jobsList'>" +
                    "<h5 class='job_title'>" + recentArr[i].job_title + "</h5>" +
                    "<h6 class='company_name'>" + recentArr[i].company_name + "</h6>" +
                    "<p class='info'> <i class='fas fa-map-marker-alt '></i>" + recentArr[i].job_city + ", " +
                    recentArr[i].job_state + "<br>" +
                    "<i class='fas fa-dollar-sign'></i> " + "Salary: " + recentArr[i].job_salary + "<br>" +
                    "<i class='fas fa-clipboard'></i>" + recentArr[i].job_description + "<br>" +
                    "<i class='fas fa-code'></i>" + recentArr[i].job_requirements + "</p>" +
                    "<div><button class='applyJob btn btn-primary' data-id='" + recentArr[i].id + "' data-apply='" + !recentArr[i].applied_to + "'>Apply"

                if (addedJob === currentDate) {
                    recentJob.append(createdJob);
                    isAvail = true;
                }

                createdJob += "</button></div></div>";
            }

            if (!isAvail) {
                heading = $("#heading").html("<h2>No Recent Jobs Added..</h2>");
                alert("No Recent Jobs Added");
            }
        });
    });

    // Applied - btn will show all the results of the jobs the user applied
    $("#applied-btn").on("click", function(event) {
        event.preventDefault();
        $("#heading").empty();

        $.ajax("/jobs", {
            type: "GET"

        }).then(function(data) {
            $('.jobsList').remove(); // Will clear all results for new searches
            var isAvail = false;
            var appliedJobs = $("#applied-jobs");
            var jobsArr = data.jobs; // results of all jobs available in the database
            var len = jobsArr.length; // The length of all data.jobs (number)

            var heading = $("#heading").html("<h2>Results for All Jobs Applied!</h2>");

            // Loop through the database to get the exact results
            // for each job.
            for (var i = 0; i < len; i++) {
                var jobs = "<div class='jobsList'>" +
                    "<h5 class='job_title'>" + jobsArr[i].job_title + "</h5>" +
                    "<h6 class='company_name'>" + jobsArr[i].company_name + "</h6>" +
                    "<p class='info'> <i class='fas fa-map-marker-alt '></i>" + jobsArr[i].job_city + ", " +
                    jobsArr[i].job_state + "<br>" +
                    "<i class='fas fa-dollar-sign'></i> " + "Salary: " + jobsArr[i].job_salary + "<br>" +
                    "<i class='fas fa-clipboard'></i>" + jobsArr[i].job_description + "<br>" +
                    "<i class='fas fa-code'></i>" + jobsArr[i].job_requirements + "</p>" +
                    "<div><button class='delete btn btn-danger' data-id='" + jobsArr[i].id + "'>Delete"

                if (jobsArr[i].applied_to) {
                    appliedJobs.append(jobs);
                    isAvail = true;
                }

                jobs += "</button></div></div>";
            }

            if (!isAvail) {
                heading = $("#heading").html("<h2>You haven't applied to any jobs yet!</h2>");
            }
        });
    });


    // ALL jobs available coming from the database
    $("#available-btn").on("click", function(event) {
        event.preventDefault();
        $("#heading").empty();

        $.ajax("/jobs", {
            type: "GET"

        }).then(function(data) {
            console.log(data);
            $('.jobsList').remove(); // Will clear all results for new searches

            var heading = $("#heading").html("<h2>Jobs Available!</h2>");

            var availableJobs = $("#available-jobs");
            var jobsArr = data.jobs;
            var len = jobsArr.length; // The length of all data.jobs

            // Loop through the database to get the exact results for each job.
            for (var i = 0; i < len; i++) {

                var jobs = "<div class='jobsList'>" +
                    "<h5 class='job_title'>" + jobsArr[i].job_title + "</h5>" +
                    "<h6 class='company_name'>" + jobsArr[i].company_name + "</h6>" +
                    "<p class='info'> <i class='fas fa-map-marker-alt '></i>" + jobsArr[i].job_city + ", " +
                    jobsArr[i].job_state + "<br>" +
                    "<i class='fas fa-dollar-sign'></i> " + "Salary: " + jobsArr[i].job_salary + "<br>" +
                    "<i class='fas fa-clipboard'></i>" + jobsArr[i].job_description + "<br>" +
                    "<i class='fas fa-code'></i>" + jobsArr[i].job_requirements + "</p>" +

                    "<div><button class='applyJob appliedJob btn btn-primary' data-id='" + jobsArr[i].id + "' data-apply='" + !jobsArr[i].applied_to + "'>Apply"

                if (!jobsArr[i].applied_to) {
                    availableJobs.append(jobs);

                } else if (jobsArr[i].applied_to) {
                    // This will hide all the jobs that the user clicked to applied for any job.
                    $(this).hide();
                }

                jobs += "</button></div></div>";
            }
        });
    });

    // Apply for a job btn
    $(document).on("click", ".applyJob", function(event) {
        event.preventDefault();

        var jobId = $(this).data("id");
        var appliedJob = $(this).data("apply") === true;

        $(this).text("Applied!").addClass("btn btn-secondary");

        var newApplied = {
            applied_to: appliedJob
        };

        $.ajax("/jobs/" + jobId, {
            type: "PUT",
            data: JSON.stringify(newApplied),
            dataType: "json",
            contentType: "application/json"

        }).then(function(data) {
            $("#recent-modal").modal("toggle");
            // location.reload(); // Reload the page to get the updated list
        });
    });

    // Sending a request to the sever to delete a job post
    $(document).on("click", ".delete", function(event) {
        event.preventDefault();

        // This is going to target the selected ID
        var jobId = $(this).data("id");

        $.ajax("/jobs/" + jobId, {
            type: "DELETE",

        }).then(function() {
            location.reload();
        });
    });


});

// Need to work on to receive specific keywords for inputs results when searching job_title and job_state