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
			var replace = jsondata.replace(/\r\n/g,"\?");
 			var array = replace.split('?');
 			var data = [];
 			for(var i=0; i<array.length; i++){
 				var tempObj = JSON.parse(array[i]);
 				data.push(tempObj);
 			}
 			data = _.each(data,function(d){
 				for(var key in d){
 					if(typeof(d[key]) == 'object'){
 						for(var key2 in d[key]){
 							d[key+'.'+key2] = d[key][key2];
 						}
 						delete d[key];
 					}
 				}
 			});
 			console.log(data);
		}; // end of reader.onload
		reader.onerror = function() {
			alert('Unable to read ' + file.fileName);
		};
	}}
}); // end of $document