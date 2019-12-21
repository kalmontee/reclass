$(document).ready(function () {
    $.ajax("/jobs", {
        type: "GET"
    }).then(function (data) {
        console.log(data);

        var recentJobs = $("#jobs-added");
        var jobsArr = data.jobs;
        var len = jobsArr.length;

        for (var i = 0; i < len; i++) {
            var jobs = "<h6> Recent Jobs Added <br>" + jobsArr[i].job_title + "<br>" + jobsArr[i].job_city +
                ", " + jobsArr[i].job_state + "<br>" + " Salary: " + jobsArr[i].job_salary + "<br>" +
                jobsArr[i].job_description + "<br>" + jobsArr[i].job_requirements + "</h6>";
        }
        recentJobs.append(jobs);
    });
    
    $("#employer-btn").click(function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        // [name=plan] will find an element with a "name" attribute equal to the string "plan"
        var newJOb = {
            title: $("#job-title").val().trim(),
            state: $("#state").val().trim(),
            city: $("#city").val().trim(),
            salary: $("#salary").val().trim(),
            job_description: $("#job-desc").val().trim(),
            job_requirements: $("#job-req").val().trim()
                
        };

        // Send the POST request.
        $.ajax("/jobs", {
            type: "POST",
            data: JSON.stringify(newJOb),
            dataType: "json",
            contentType: "application/json"
        }).then(function () {
            console.log("created new plan");
            // Reload the page to get the updated list
            location.reload();
        });
    });

});