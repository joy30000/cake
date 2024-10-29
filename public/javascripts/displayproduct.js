const isTrue =<%= JSON.stringify(i) %>
console.log(isTrue);
const element = document.getElementById('add');
document.addEventListener('DOMContentLoaded', function () {
if (isTrue == false) {


  element.classList.remove('bg-[#e99030]')
  element.classList.add('hidden')
  element.classList.add('mt-5')

}
})