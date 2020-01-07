$(document).ready(function() {
    $("#jobSearch").on("submit", function(event) {
        event.preventDefault();
        $("#heading").empty();

        // Form validation
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

            // "/test" is coming from the ORM to get the specific request from the database. selectOne function
            $.ajax("/jobs/" + title + "/" + state, {
                type: "GET"

            }).then(function(data) {
                console.log(data);
                $('.jobsList').remove(); // Will clear all results for new searches
                $("#jobTitle").val(''); // Will clear input
                $("#cityState").val(''); // Will clear input

                var heading = $("#heading").html("<h2>Results for " + title + " in " + state + "</h2>");

                var recentJobs = $("#jobs_added");
                var jobsArr = data.jobs;
                var len = jobsArr.length; // The length of all data.jobs

                // Loop through the database to get the exact results for each job.
                for (var i = 0; i < len; i++) {
                    var jobs = "<div class='jobsList'>" +
                        "<h5 class='job_title'>" + jobsArr[i].job_title + "</h5>" +
                        "<h6 class='company_name'>" + jobsArr[i].company_name + "</h6>" +
                        "<p class='info'>" + jobsArr[i].job_city + ", " + jobsArr[i].job_state + "<br>" +
                        "Salary: " + jobsArr[i].job_salary + "<br>" +
                        jobsArr[i].job_description + "<br>" +
                        jobsArr[i].job_requirements + "</p></div>";
                    recentJobs.append(jobs);
                }
            });
            // ==============================Leave this alone for now=================================

            // Second AJAX GET request -- Will only return all jobs in the current state
            // $.ajax("/jobs/" + state, {
            //     type: "GET",
            // }).then(function(data) {
            //     console.log(data)

            //     var recentJobs = $("#jobs_added");
            //     var jobsArr = data.jobs;
            //     var len = jobsArr.length; // The length of all data.jobs

            //     // Loop through the database to get the exact results for each job.
            //     for (var i = 0; i < len; i++) {
            //         var jobs = "<div class='jobsList'>" +
            //             "<h5 class='job_title'>" + jobsArr[i].job_title + "</h5>" +
            //             "<h6 class='company_name'>" + jobsArr[i].company_name + "</h6>" +
            //             "<p class='info'>" + jobsArr[i].job_city + ", " + jobsArr[i].job_state + "<br>" +
            //             "Salary: " + jobsArr[i].job_salary + "<br>" +
            //             jobsArr[i].job_description + "<br>" +
            //             jobsArr[i].job_requirements + "</p></div>";
            //         recentJobs.append(jobs);
            //     }
            // })

        } else {
            alert("Please fill out all fields before submitting!");
        }
    });

    $("#employer-btn").click(function(event) {
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
        }).then(function() {
            console.log("created new plan");
            // Reload the page to get the updated list
            location.reload();
        });
    });


});