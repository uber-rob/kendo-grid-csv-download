

var toCSV = function (gridId, ignoredTemplates) {
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
        var title = grid.columns[i].title,
            field = grid.columns[i].field;
        if (typeof (field) === "undefined") { continue; /* no data! */ }
        if (typeof (title) === "undefined") { title = field }

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
            var fieldName = grid.columns[i].field,
				template = grid.columns[i].template;

            if (typeof (fieldName) === "undefined") { continue; }
			
            var value = data[row][fieldName];

            if (value === null) {
                value = "";
            } else {
				if ((typeof(template) !== "undefined") && ($.inArray(fieldName.toString(), ignoredTemplates) < 0)) {
					value = value.toString();
					var kt = kendo.template(template.toString());
					value = kt(data[row]);
				} else {
					value = value.toString();
				}
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
