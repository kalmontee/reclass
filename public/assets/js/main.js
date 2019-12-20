$(document).ready(function() {
    $.ajax("/jobs", {
        type: "GET"
    }).then(function(data) {
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

});