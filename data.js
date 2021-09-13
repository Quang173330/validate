$(document).ready(function () {
    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        $(this).find('#form').attr('id_test', button.data('id'))
    })
    $('.tdn').click(function (){
        
    })
    $('#form').submit(function (e) {
        e.preventDefault();
        id = $(this).attr('id_test')
        console.log(id)
    })
})