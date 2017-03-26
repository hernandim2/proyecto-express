angular.module("appTareas",['ui.router','ngMessages','ngMaterial']).config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('lista', {
                url: '/lista',
                templateUrl: '/views/lista.html',
                controller: 'controllerLista'
            })
            .state('editar', {
                url: '/editar',
                templateUrl: '/views/editar.html',
                controller: 'controllerEditar'
            });

        $urlRouterProvider.otherwise('lista');
    })
.factory('comun', function() {
        var comun = {}

        comun.tareas = [{
            nombre: 'Comprar comida',
            prioridad: '1',
            completado:true
        }, {
            nombre: 'Pasear al perro',
            prioridad: '2',
            completado:false
        }, {
            nombre: 'Ir al cine',
            prioridad: '0',
            completado:true
        }];

        comun.tarea = {};
        comun.eliminar = function(tarea) {
            var indice = comun.tareas.indexOf(tarea);
            comun.tareas.splice(indice, 1);
        }

        return comun;
    })
    .controller('controllerLista', function($scope, $state, comun) {
        var modulo = $scope;
        modulo.tarea = {}
            // $scope.tareas = [];

        modulo.tareas = comun.tareas;
        modulo.prioridades = ['Baja', 'Normal', 'Alta'];
        modulo.seleccionados =[];
        modulo.agregar = function() {
            modulo.tareas.push({
                nombre: modulo.tarea.nombre,
                prioridad: parseInt(modulo.tarea.prioridad),
                completado:false
            });

            modulo.tarea.nombre = '';
            modulo.tarea.prioridad = '';
        }

        modulo.masPrioridad = function(tarea) {
            tarea.prioridad += 1;
        }

        modulo.menosPrioridad = function(tarea) {
            tarea.prioridad -= 1;
        }

        modulo.eliminar = function(tarea) {
            comun.eliminar(tarea);
        }
        modulo.seleccionado = function(tarea) {
             var indice = comun.tareas.indexOf(comun.tarea);
            // comun.tareas[indice].completado = true;
            if (tarea.completado) {
                tarea.completado = false;
            }else{
                tarea.completado = true;
            }
             
        }
        modulo.procesaObjeto = function(tarea) {
            comun.tarea = tarea;
            $state.go('editar');
        }
           

    }).controller('controllerEditar', function($scope, $state, comun) {
       $scope.tarea = comun.tarea;

        $scope.actualizar = function() {
            var indice = comun.tareas.indexOf(comun.tarea);
            comun.tareas[indice] = $scope.tarea;
            comun.tareas[indice].completado = false;
            $state.go('lista');
        }

        $scope.eliminar = function(){
            comun.eliminar($scope.tarea);
            $state.go('lista');
        }


    });




// $(document).ready(function() {
//     $('.task-item input[type=checkbox]').bind('click',function(evento) {
//         // Busco el id del elemento clickeado
//         var id = evento.currentTarget.id;
//         // Veo si esta completado o no
//         var completada = evento.currentTarget.checked;

//         // Hago un request AJAX para informar que fue completado o no
//         $.ajax('/' + id + '/completado', {
//             data: JSON.stringify({completada: completada}),
//             type : 'POST',
//             contentType : 'application/json'
//         });

//         // Obtengo el valor de pendientes actual
//         var pendientes = parseInt($('.pending-task-count').html());
//         // le resto o agrego uno
//         pendientes += (completada)?-1:1;
//         // Actualizo el elemento
//         $('.pending-task-count').html(pendientes);
//     });
// });
