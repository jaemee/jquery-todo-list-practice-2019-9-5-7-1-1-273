$(document)
    .ready(function () {

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }


        // code to be implemented
      
        const todo = [];

        function updateAllitems(){
            $.each($("input[name='done-todo']"), function(){            
                todo.push($(this.parentNode));
            });
        }
        

        function addToDoList() {
            var toAdd = $('input:text').val();
            $('ol').append(("<li id='"+generateUUID()+"' class=''><input name='done-todo' type='checkbox' class='done-todo'><span> "+toAdd+" </span></li>"));

            updateAllitems();
            $('input:text').val("");
        }

       function updateToDoList(updatedVar) {
            var parent = updatedVar.parentNode;
            if(parent.className == "checked"){
                $('#'+parent.id).removeClass("checked");
            }else {
                $('#'+parent.id).addClass("checked");
            }
            updateAllitems();
        };

        $('#button').click(addToDoList);
        
        $(document).on('dblclick', 'li', function(){
            $(this).children('span')
                .attr('contentEditable', 'true')
                .focus();
            $(this).keypress(function (event) {
                if (event.keyCode == 13) {
                    $(this).children('span')
                        .attr('contentEditable', 'false').focus();
                    }
                });
        });

        $(document).on('change', '.done-todo', function(){
            updateToDoList(this);
        });

        

        $("#filters li a").click(function(){
            var complete = [];
            var active = [];
            $.each($(todo), function(){    
                if(this.context.className == ""){
                    active.push($(this));
                }else if(this.context.className == "checked") {
                    complete.push($(this));
                }       
                
            });      

            $("#filters li a").removeClass("selected");
            $(this).addClass("selected");
            if(this.dataset.filter == "complete"){
                viewSelected(complete);
            }else if(this.dataset.filter == "active"){
                viewSelected(active);
            }else{
                viewSelected(todo);
            }
           
        });

        function viewSelected(todoList){
            $('ol').html(todoList);
        }

    });