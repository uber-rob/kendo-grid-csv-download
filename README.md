# Kendo Grid download / export to CSV

Download the sorted, filtered contents of a Kendo UI grid control when using client-side filtering and sorting (as you're likely to do if you're using the free version).

## Dependencies:

- jQuery - any version probably, certainly anything recent enough to power Kendo Grid.
- Kendo Grid - tested with version 2013.1.514 (Q1 2013 SP1) but I imagine works with older versions.

## Usage:

Suggested usage is with [Downloadify](https://github.com/dcneiner/Downloadify):

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

	window.open("data:text/csv;charset=utf-8," + escape(toCsv("gridElementId")));
	
## Credit

Based on work found originally on the [Kendo UI forums](http://www.kendoui.com/forums/framework/data-source/export-to-csv.aspx)