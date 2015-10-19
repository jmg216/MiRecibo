/**
 * Created by Gonzalo Guevara on 19/05/2015.
 */

/* Se creo branch con tag para beta */
var duration = 300;

$(document).ready(init);

//Init
function init(){

    //Navegacion
    $(".loader").hide();

    if ($('.nav-collapse').length){
        runNav();
    }

    if ($('.select-custom').length){
        selectsInit();
    }

    if($('#cargarInfo').length){
        cargarInfoSelect();
    }
    detectaAgente();
    seleccionFirmas();
    seleccionRecuadro();
    abrirPdfEnModal();
    
    if (typeof(cargarDocumentosPendientes) == "function"){
        cargarDocumentosPendientes( setContenidoTabla );
    }

    cargarPDFSeleccionado();
    
    sincronizarToken();	
    
    cargarPDFFirmado();
}

function detectaAgente(){
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);
} 

function runNav(){
    var nav = responsiveNav('.nav-collapse', {
        //insert: "after"
    });
}

function selectsInit(){
    var selectInputs = $('.select-custom');

    selectInputs.select2();
}


function cargarInfoSelect(){

    var selectMain      = $('#cargarInfo');
    var primerValor     = selectMain.val();
    var resultArea      =  $('.result-apariencia p');

    //imagen vars
    var mainImage       = $('#cargarImagen');
    var existeImagen    = false;
    var imagenBlock     = $('.existe-imagen');
    var selloResuly     = $('.result-sello');
    var imagenReemplazo = $('.result-sello img');

    var conImagen = 'images/sello-dummy.jpg';
    var sinImagen = 'images/no-image.jpg';
    var otraImagen = 'images/sello-dummy-e.jpg';
    var imgBlanco = 'images/img-blanco.jpg';


    var priermaImagenCargada = mainImage.val();

    if (priermaImagenCargada == 'sello'){

    }else if(priermaImagenCargada == 'otraimagen'){
        imagenReemplazo.attr('src', otraImagen);

    }else if(priermaImagenCargada == 'sello-empleado'){

        imagenReemplazo.attr('src', imgBlanco);
    }
    else {
        imagenReemplazo.attr('src', sinImagen);
    }



    //Cargamos el valor que viene cuando carga la página
    resultArea.html(primerValor);

    //detectamos el cambio del select y reemplazamos el valor
    selectMain.on('change', function(e){
        //console.log("Aparece: "+  e.val);
        var seleccionado = e.val;
        resultArea.html(seleccionado);
    });

    //var oldSrc = 'http://example.com/smith.gif';
    //var newSrc = 'http://example.com/johnson.gif';
    //$('img[src="' + oldSrc + '"]').attr('src', newSrc);

    //cambio de imagen
    mainImage.on('change', function(e){
        var seleccionado = e.val;

        if(seleccionado == 'sello'){
            imagenReemplazo.attr('src', conImagen);

        }else if(seleccionado == 'otraimagen'){

            imagenReemplazo.attr('src', otraImagen);

        } else if(seleccionado == 'sello-empleado'){

            imagenReemplazo.attr('src', imgBlanco);
        }

        else {
            imagenReemplazo.attr('src', sinImagen);
        }

    });




}


function seleccionFirmas(){

    var firmaItem = $('.firma-block');

    firmaItem.click(function(){
	

        var aera = $(this).attr('data-area');
        var claseActiva = "active-area";

        firmaItem.each(function(){

            if($(this).attr('data-area') == aera){
                if(!$(this).hasClass(claseActiva)){
                    $(this).addClass(claseActiva);
                }
            }else {
                $(this).removeClass(claseActiva);
            }

        });
    });

}


function seleccionRecuadro(){

    var recuadroItem = $('.recuadro > div');
    var blockFirma = $('.firma-area');


    recuadroItem.on('click',function(){

        var size = $(this).attr('data-size');
        var claseActiva = "active-recuadro";

        recuadroItem.each(function(){

            if($(this).attr('data-size') == size){
                if(!$(this).hasClass(claseActiva)){
                    $(this).addClass(claseActiva);


                    if(size == 'r-sm'){
                        blockFirma.addClass('sm-grid');
                    }else {
                        blockFirma.removeClass('sm-grid');
                    }

                    if(size == 'r-md'){
                        blockFirma.addClass('md-grid');
                    }else {
                        blockFirma.removeClass('md-grid');
                    }

                    if(size == 'r-lg'){
                        blockFirma.removeClass('md-grid');
                        blockFirma.removeClass('sm-grid');
                    }

                }
            }else {
                $(this).removeClass(claseActiva);
            }

        });
    });

}


function abrirPdfEnModal(){
    $('.view-pdf').on('click',function(){
        var pdf_link = $(this).attr('href');
        var pdf_id = $(this).attr('id');
        //var iframe = '<div class="iframe-container"><iframe src="'+pdf_link+'"></iframe></div>'
        //var iframe = '<object data="'+pdf_link+'" type="application/pdf"><embed src="'+pdf_link+'" type="application/pdf" /></object>'
        var iframe = '<object type="application/pdf" data="'+pdf_link+'" width="100%" height="980">No Support</object>'
        $.createModal({
            title:'Recibo: ' + pdf_id,
            message: iframe,
            closeButton:true,
            scrollable:false
        });
        return false;
    });
}



$('#myModal2').on('show.bs.modal', function (e) {
    var modal = $(this);
    initModalPin( modal );
    $("#doc-recibo").hide(duration);
});

function initModalPin (modal){
    if (isSCardActivo()){
        //abrir ok
        modal.find('.modal-body input').prop("disabled", false);
        modal.find('.modal-body .help-inline').hide();
        modal.find('.modal-body .control-group').removeClass('error');

    }
    else{
        //abrir con mensaje de error
        modal.find('.modal-body input').prop("disabled", true);        
        modal.find('.modal-body .help-inline').show();
        modal.find('.modal-body .control-group').addClass('error');
    }
}

$('#myModal2').on('hide.bs.modal', function (e) {
        var modal = $(this);
        modal.find('.modal-body input').val('');       
});

$('#myModal').on('hide.bs.modal', function (e) {
     $("#doc-recibo").show(duration);
});

$('#myModal').on('show.bs.modal', function (e) {
     $("#doc-recibo").hide(duration);
});

$('#myModal2 #aceptarPin').click(function() {

    $('#loading').show();
    var pin = $('#myModal2').find('.modal-body input').val();
    var json = authSCard( pin );
    var object = JSON.parse(json);
    
    if (object.codigo == 'OK'){
        var recibo = $("#doc-firmar-recibo").val();

        $('#myModal').find('.modal-header #subtitulo').html('Recibo: ' + recibo );
        $('#myModal').find('.modal-body #data_cert').html( 'Certificado: ' + object.certificado.nombre);
        $('#myModal').find('.modal-body #data_ci').html('Cédula: ' + object.certificado.cedula);
        $('#myModal').find('.modal-body #data_emisor').html('Emisor: ' + object.certificado.emisor);
        $('#myModal').find('.modal-body #data_validez').html('Fecha Validez: ' + object.certificado.fechaValidez);
        $('#myModal2').modal('hide');
        $('#myModal').modal('show');
    }
    else{
        $('#myModal2').find('.modal-body .help-inline').html(object.msj);
        $('#myModal2').find('.modal-body .help-inline').show();
        $('#myModal2').find('.modal-body .control-group').addClass('error');
    }
    $('#loading').hide();
});


$('#myModal #firmafinal').click(function() {
        $('#loading-firma').show();
        var nombreDocumento = $("#doc-firmar-nombre").val();
        var respuesta = firmar(nombreDocumento);
        var valor = respuesta.split(',')[0];
        var nuevonombre = respuesta.split(',')[1];
        $('#loading-firma').hide();
        if (valor == 'true'){
            window.location = "empleado-administracion-recibo-firmado.html?doc=" + nuevonombre;
        }
        else{

        }
});

         
function cargarPDFSeleccionado(){
    var sPageURL = window.location.search.substring(1);

    if (sPageURL){
        var idDoc = sPageURL.split('=')[1];
        var namepdf = idDoc.split('_')[0];
        var nroRecibo = idDoc.split('_')[1];
        var fecha = idDoc.split('_')[2];

        $("#doc-firmar-recibo").val( nroRecibo );
        $("#doc-firmar-nombre").val( namepdf );

        $("#doc-recibo").prop('src', 'pdfs/sinFirmar/' + namepdf);
        $("#info-recibo").html('Recibo '  + nroRecibo + " - " + fecha );
        $("#firmar").prop('href', '#myModal2');
    }
}

function cargarPDFFirmado(){

    if (window.location.href.indexOf('empleado-administracion-recibo-firmado.html') > 0){
        var sPageURL = window.location.search.substring(1);
        if (sPageURL){
            var idDoc = sPageURL.split('=')[1];
            var namepdf = idDoc.split('-')[0];

            $("#doc-recibo").prop('src', 'pdfs/sinFirmar/' + idDoc);
            $("#info-recibo").html('Recibo '  + namepdf + " - Firmado");
        }
    }
}


function sincronizarToken(){
    $("#refresh").on('click',function(){
        $('#loading').show();
        sincronizar();
        $('#loading').hide();
        var modal = $('#myModal2');
        initModalPin( modal );
    });
}
