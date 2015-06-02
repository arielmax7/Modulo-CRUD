$(document).ready(function() {
      // Dialogo muestra formulario para agregar usuario
      var dialogo = $("#agregar").dialog({
        autoOpen: false,
        modal: true,
        title: "Agregar Usuario",
        buttons: {
          "Crear usuario": function(){
              var datos = $('#formulario').serialize();
              $.ajax({
                url:'agregar.php',
                type:'POST',
                data: datos
              }).done(function() {

                window.location.replace('proyecto-crud.php');
              });

          },
          Cancel: function() {
            $('#formulario')[0].reset();
            $(this).dialog("close");
          }
        }

      });

      // Dialogo muestra formulario para editar usuario
    var actualizar = $("#editar").dialog({
        autoOpen: false,
        modal: true,
        title: "Editar Usuario",
        buttons: {
          "Editar usuario": function(){
              var id = $('#user').val();
              var datos = $('#formulario2').serializeArray();
              datos.push({name: 'id', value: id});
              $.ajax({
                url:'actualizar.php',
                type:'POST',
                data: datos
              }).done(function() {

                window.location.replace('proyecto-crud.php');
              });

          },
          Cancel: function() {
            $('#formulario2')[0].reset();
            $(this).dialog("close");
          }
        }

      });


      // Dialogo muestra mensaje de confirmación para eliminar
    var confirmar = $( "#dialogo-confirm" ).dialog({
          autoOpen: false,
          resizable: false,
          modal: true,
          buttons: {
            "Eliminar": function() {
              var id = $('#user').val();
              $.ajax({
                url: 'eliminar.php',
                type: 'POST',
                data: {'id': id}
              })
              .done(function() {
                window.location.replace('proyecto-crud.php');
              });
              
            },
            Cancel: function() {
              $(this).dialog( "close" );
             
            }
          }
    });

    // evento click muestra el dialogo
    $( "#nuevo" ).button().on( "click", function() {
      dialogo.dialog( "open" );
    });


    // evento click muestra dialogo de confirmación para eliminar
    $(".eliminar").click(function(event) {
      $('#user').val($(this).attr("id"));
      confirmar.dialog("open");
    });

    // evento click muestra dialogo con formulario para editar usuario
    $(".editar").click(function(event) {
      var id = $(this).attr("id");
      $('#user').val(id);
        $.ajax({
          url: 'editar.php',
          type: 'POST',
          dataType: 'json',
          data: {'id': id}
        })
        .done(function(data) {

          $('#usuario').val(data[0].usuario);
          $('#nombre').val(data[0].nombre);
          $('#apellido').val(data[0].apellido);
          $('#telefono').val(data[0].telefono);
          $('#email').val(data[0].email);
          
          actualizar.dialog('open');

        });
        
    });

   		
   });