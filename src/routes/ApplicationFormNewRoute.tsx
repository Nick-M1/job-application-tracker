import ApplicationForm from "../components/application-form/ApplicationForm";
import getInitialEmptyFormState from "../logic/get-initial-empty-form-state";

export function Component() {
    return <ApplicationForm initialFormState={getInitialEmptyFormState()} initialNumberOfStages={1}/>
}