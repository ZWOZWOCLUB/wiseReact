'use strict';

//사원 상세보기 모달 내용 수정
document.addEventListener('DOMContentLoaded', function(){

    let modalButtons = document.querySelectorAll('[data-bs-toggle="modal"]');

    modalButtons.forEach(function(button){
        button.addEventListener('click', function(){
            let name = button.getAttribute('data-name'); //data-name 은 html에서 버튼눌렀을 때의 그려주는 정보값
            let email = button.getAttribute('data-email');
            let contact = button.getAttribute('data-contact');


            document.getElementById('nameBasic').textContent = name; //span태그로 받아줘서 textContent로. 인풋태그면 value
            document.getElementById('emailBasic').textContent = email;
            document.getElementById('dobBasic').textContent = contact;

            document.getElementById('exampleModalLabel1').innerText = name + "의 상세";
        });
    });
});