# Kendo Grid download / export to CSV

Download the sorted, filtered contents of a Kendo UI grid control when using client-side filtering and sorting (as you're likely to do if you're using the free version).

## Dependencies:

- jQuery - any version probably, certainly anything recent enough to power Kendo Grid.
- Kendo Grid - tested with version 2013.1.514 (Q1 2013 SP1) but I imagine works with older versions.

## Usage:

### Create a CSV

    toCSV(<document_id_of_kendo_grid>, [array of field names to export without template]);
	
This include file contains a function for producing a CSV file from the contents of the Kendo Grid. By default
any templates for those cells are used to format the data but if you want to skip some formatting you can list
the fields to export as raw.

Examples:

    var csv1 = toCSV('kendo_grid');
	var csv2 = toCSV('kendo_grid', ['user_id', 'linked_data']);

### Allow user to download it

Suggested usage is with [Downloadify](https://github.com/dcneiner/Downloadify):

Please note the byte order mark `\uFEFF` - without it Excel won't read the file as UTF-8. If your page is using a different
character encoding you may need to alter this.

	<script src="swfobject.js"></script>
	<script src="downloadify.min.js"></script>
	
	<div id="gridId">Your Kendo Grid</div>
	<div id="downloadButton">Your download button</div>
	
	<script type="text/javascript">
		Downloadify.create('downloadButton', {
			filename: "filename.csv",
			data: function () {
				return "\uFEFF" + toCSV('gridId');
			},
			onComplete: function () { },
			onCancel: function () { },
			onError: function () { },
			transparent: false,
			swf: "downloadify.swf",
			downloadImage: "download.png",
			width: 100,
			height: 30,
			transparent: true,
			append: false
		});
	</script>
	

Alternative usage that may work:

	window.open("data:text/csv;charset=utf-8," + escape(toCSV("gridElementId")));
	
## Credit

Based on work found originally on the [Kendo UI forums](http://www.kendoui.com/forums/framework/data-source/export-to-csv.aspx)

## Future work

- Perhaps the suppressed templates could be marked in the KendoUI column definition? Might be a good / bad idea?
- Alternative templates in the KendoUI column definitions?