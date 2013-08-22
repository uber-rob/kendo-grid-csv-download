﻿

var toCSV = function (gridId) {
    var csv = '';

    // Get access to basic grid data
    var grid = $("#" + gridId).data("kendoGrid"),
        datasource = grid.dataSource,
        originalPageSize = datasource.pageSize();

    // Increase page size to cover all the data and get a reference to that data
    datasource.pageSize(datasource.total());
    var data = datasource.view();

    //add the header row
    for (var i = 0; i < grid.columns.length; i++) {
        var title = grid.columns[i].title;
        if (typeof (title) === "undefined") { title = grid.columns[i].field; }
        if (typeof (title) === "undefined") { continue; }

        title = title.replace(/"/g, '""');
        csv += '"' + title + '"';
        if (i < grid.columns.length - 1) {
            csv += ",";
        }
    }
    csv += "\n";

    //add each row of data
    for (var row in data) {
        for (var i = 0; i < grid.columns.length; i++) {
            var fieldName = grid.columns[i].field;
            if (typeof (fieldName) === "undefined") { continue; }
            var value = data[row][fieldName];

            if (value === null) {
                value = "";
            } else {
                value = value.toString();
            }

            value = value.replace(/"/g, '""');
            csv += '"' + value + '"';
            if (i < grid.columns.length - 1) {
                csv += ",";
            }
        }
        csv += "\n";
    }

    // Reset datasource
    datasource.pageSize(originalPageSize);

    return csv;
};
