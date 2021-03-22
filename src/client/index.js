import handleSubmit from './js/formHandler'

// include your scss file here
import './styles/_resets.scss';
import './styles/_base.scss';
import './styles/_footer.scss';
import './styles/_form.scss';
import './styles/_header.scss';

var submitFn = function () {
    var btn = document.getElementsByClassName('btn-submit')[0];
    btn.disabled = true;
    handleSubmit(document.getElementById("article-url").value).then(a => {
        debugger;
        if (a.is_valid == 1) {
            document.getElementById('text').innerHTML = JSON.stringify(a.response.text);
            document.getElementById('agreement').innerHTML = JSON.stringify(a.response.agreement);
            document.getElementById('score_tag').innerHTML = JSON.stringify(a.response.score_tag);
            document.getElementById('subjectivity').innerHTML = JSON.stringify(a.response.subjectivity);
            document.getElementById('confidence').innerHTML = JSON.stringify(a.response.confidence);
            document.getElementById('irony').innerHTML = JSON.stringify(a.response.irony);

        }
        else {
            document.getElementById('text').innerHTML = '';
            document.getElementById('agreement').innerHTML = '';
            document.getElementById('score_tag').innerHTML = '';
            document.getElementById('subjectivity').innerHTML = '';
            document.getElementById('confidence').innerHTML = '';
            document.getElementById('irony').innerHTML = '';
            alert("Wrong URL!!");
        }
        btn.disabled = false;
    })
};
function handleForm(event) {
    event.preventDefault();

}

window.addEventListener('DOMContentLoaded', () => {
    var form = document.getElementById("form");
    form.addEventListener('submit', handleForm);

    var btn = document.getElementsByClassName('btn-submit')[0];
    //btn.onsubmit = submitFn;
    btn.onclick = submitFn;
    // get the button for submit
    // add event listener to it when the click to call handleSubmit function
})
export { handleSubmit }
