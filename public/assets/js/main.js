$(document).ready(function () {
    $.ajax("/jobs", {
        type: "GET"
    }).then(function (data) {
        console.log(data);

        var recentJobs = $("#jobs-added")
        var job = data.jobs;
        

        for (var i = 0; i < jobs.length; i++) {
            var jobs = "<h6> Recent Jobs Added " + job[i].job_title +
                job[i].job_state + job[i].job_city + job[i].job_salary +
                job[i].job_description + job[i].jobs_requirements + "</h6>";
        }
        recentJobs.append(jobs);

    });

});