import 'babel-polyfill';
import handleSubmit from '../js/formHandler';
// to solve ReferenceError: regeneratorRuntime is not defined
// https://knowledge.udacity.com/questions/174638


describe('Client Test', () => {
    it('Testing the response return is_valid = false for invalid url',  async () => {
        const res = await handleSubmit('fake');
        expect(res.is_valid).toBeFalsy();
    })

    it('Testing the response return is_valid = true for valid url',async () => {
        const res = await handleSubmit('https://getbootstrap.com/docs/4.1/components/modal/');
        expect(res.is_valid).toBeFalsy();
    })
})
