import validateURL from '../js/checkURL';
import 'babel-polyfill'

describe('Test check url functionality', () => {
    test('Testing the checkUrl function defined or not', () => {
        expect(validateURL).toBeDefined();
    })

    test('Testing the checkUrl function return false for invalid url', () => {
        expect(validateURL('fake')).toBeFalsy();
    })

    test('Testing the checkUrl function return true for valid url', () => {
        expect(validateURL('https://getbootstrap.com/docs/4.1/components/modal/')).toBeTruthy();
    })
})
