var requestParams = {
		host:"http://www.mirecibo.com.uy", 
		puerto:"80",
		contexto: "MiReciboService",
		path: "rest"
};


var cargarDocumentosPendientes = function( callback ) {
	
	if (window.location.href.indexOf('empleado-administracion-lista-recibos.html') > 0){
		var url = requestParams['host']+ ":" + requestParams['puerto'] + "/" + requestParams['contexto'] + "/" + requestParams['path'];
		url += "/pdfs/getUnsigned/";
		$.ajax({
			url : url,
			dataType : 'json',
			cache: false,
			type : "GET"

		}).done(function(response) {
			//console.log("OK");
			callback( response );
			
		}).fail(function(xhr, status) {
			console.log("error");
			
		}).always(function(xhr, status) {
			console.log("complete");
		});
	}
};


var cargarDocumentosFirmados = function( callback ) {
	
	if (window.location.href.indexOf('empleado-administracion-lista-recibos-firmados.html') > 0){

		var url = requestParams['host']+ ":" + requestParams['puerto'] + "/" + requestParams['contexto'] + "/" + requestParams['path'];
		url += "/pdfs/getSigned/";
		$.ajax({
			url : url,
			dataType : 'json',
			cache: false,
			type : "GET",

		}).done(function(response) {
			//console.log("OK");
			callback( response );
			
		}).fail(function(xhr, status) {
			console.log("error");
			
		}).always(function(xhr, status) {
			console.log("complete");
		});
	}
};

var setContenidoTabla = function( data ){
	var bodyTabla = '';
	$.each(data, function(i, val) {
		bodyTabla = bodyTabla.concat('<tr>' + 
							'<td style="text-align: center"><input class="doc-pendiente" id="'+ val.nombre + "_" + val.nroRecibo + "_" + val.fecha + '" type="checkbox"></td>' +
                    		'<td>' + val.nroRecibo + '</td>' + 
						    '<td>' + val.fecha + '</td>' + 
						    '<td>' + val.concepto + '</td>' + 
						    '<td>' + val.estado +'</td>' + 
                		'</tr>');
	});
	$('#docs-pendientes tbody').html(bodyTabla);
	seleccionDocumentos();
};

function seleccionDocumentos(){
    $('.doc-pendiente').on("click", function() {
            if ($(this).is(':checked')) {
                var val = $(this).prop('id');
                $('#doc-checked').val( val );
                $('#verRecibo').prop('href', 'empleado-administracion-recibo-two-modals.html?doc=' + val);
            }
            else{
                $('#doc-checked').val( '' );   
                $('#verRecibo').prop('href', '#');
            }
    });
}

