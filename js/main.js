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
 			var data = [],
 				tableArray = [];
 			for(var i=0; i<array.length; i++){
 				var tempObj = JSON.parse(array[i]);
 				data.push(tempObj);
 			}
 			data = _.each(data,function(d){
 				var temp = [];
 				for(var key in d){
 					if(typeof(d[key]) == 'object'){
 						for(var key2 in d[key]){
 							d[key+'.'+key2] = d[key][key2];
 							//temp.push(d[key][key2])
 						}
 						delete d[key];
 					} //else {
						//temp.push(d[key]);
 					//}
 					
 				}
 				d = sortObject(d);
 				for(var k in d){
					temp.push(d[k]);
				}
 				tableArray.push(temp);
 			});
 			// get object properties
 			var prop = [];
 			for(var key in data[0]){
 				prop.push({'title': key});
 			}
 			prop = sortObjectForValue(prop);
 			//console.log(data);

 			var table = $('#tableDisplay').DataTable({
        		data: tableArray,
				columns:prop  
		    });

		    $('a.toggle-vis').on( 'click', function (e) {
		        e.preventDefault();
		 
		        // Get the column API object
		        var column = table.column( $(this).attr('data-column') );
		 
		        // Toggle the visibility
		        column.visible( ! column.visible() );
		    } );

		}; // end of reader.onload
		reader.onerror = function() {
			alert('Unable to read ' + file.fileName);
		};
	}}
	function sortObject(o) {
	    var sorted = {},
	    key, a = [];

	    for (key in o) {
	        if (o.hasOwnProperty(key)) {
	            a.push(key);
	        }
	    }

	    a.sort();

	    for (key = 0; key < a.length; key++) {
	        sorted[a[key]] = o[a[key]];
	    }
	    return sorted;
	}
	function sortObjectForValue(o) {
	    var sorted = [],
	     	value = _.pluck(o,'title');
	    value.sort();
	    for (var i = 0; i < value.length; i++) {
	        var tempObj = {"title":value[i]};
	        sorted.push(tempObj);
	    }
	    return sorted;
	}
}); // end of $document