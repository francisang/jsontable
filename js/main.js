$(document).ready(function() {
	// The event listener for the file upload
	document.getElementById('txtFileUpload')
			.addEventListener('change', upload, false); //addEventListener(event,function,useCapture)
	// Method that checks that the browser supports the HTML5 File API
	function browserSupportFileUpload() {
		var isCompatible = false;
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			isCompatible = true;
		}
		return isCompatible;
	}
	
	// Method that reads and processes the selected file
	function upload(evt) {
		upload=1;
		if (!browserSupportFileUpload()) {
			alert('The File APIs are not fully supported in this browser!');
		} else {
		data = null;
		var file = evt.target.files[0];
		filename = evt.target.files[0].name;
		//Add dataset table
			/*var t = $('#example').DataTable();
		    var counter = 1;
		 
		    $('#addRow').on( 'click', function () {
		        t.row.add( [
		            counter +'.1',
		            counter +'.2'
		        ] ).draw();
		 
		        counter++;
		    } );
		    // Automatically add a first row of data
		    $('#addRow').click();*/
		//*******************************************
		var reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function(event) {
			var jsondata = event.target.result;
			data = $.csv.toArrays(csvData); //using jquery.csv-0.71.js
			arr = reformat(data);
			//Convert data into geojson
			geodata = {type : "FeatureCollection", features : csv2geojson(arr)};
			//Convert data into motion format 
			motiondata = reformat2(data);
			// Add row table
			myFunction();
		}; // end of reader.onload
		reader.onerror = function() {
			alert('Unable to read ' + file.fileName);
		};
	}}
}); // end of $document