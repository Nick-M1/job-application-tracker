export default function getInitialEmptyFormState(): FormDataCustom {
    return {
        companyName: {
            touchedByUser: false,
            error: false,
            value: '',
            validationFunc: (value) => 2 < value.length && value.length < 30
        },
        jobTitle: {
            touchedByUser: false,
            error: false,
            value: '',
            validationFunc: (value) => 2 < value.length && value.length < 30
        },
        stage1Title: {
            touchedByUser: false,
            error: false,
            value: '',
            validationFunc: (value) => 2 < value.length && value.length < 30
        },
        stage1Details: {
            touchedByUser: false,
            error: false,
            value: '',
            validationFunc: (value) => 2 < value.length && value.length < 30
        },
        stage1Date: {
            touchedByUser: false,
            error: false,
            value: new Date().toISOString().substring(0, 16),
            validationFunc: (value) => value !== ''
        },
        stage1Result: {
            touchedByUser: false,
            error: false,
            value: 'waiting',
            validationFunc: (value) => true
        },
    }
}