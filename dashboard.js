chrome.storage.local.get("trackedSites", (data) => {
    const sites = data.trackedSites || {};
    const tableBody = document.querySelector("#analytics-table tbody");
    tableBody.innerHTML = ""; 

    let labels = [];
    let times = [];

    Object.entries(sites).forEach(([site, time]) => {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${site}</td><td>${time} min</td>`;
        tableBody.appendChild(row);

        labels.push(site);
        times.push(time);
    });

    if (Object.keys(sites).length === 0) {
        tableBody.innerHTML = `<tr><td colspan="2">No data available...</td></tr>`;
    }

    // Generate Chart
    const ctx = document.getElementById("chart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Time Spent (min)",
                data: times,
                backgroundColor: "blue"
            }]
        }
    });
});

