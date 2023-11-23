import './App.css';
import {useState} from "react";

function App() {
    const [result, setResult] = useState(undefined);
    const [source, setSource] = useState(undefined);
    const [textResult, setTextResult] = useState(undefined);
    const [model, setModel] = useState("randomforest");
    const [requesting, setRequesting] = useState(false);

    const [trainResultModel, setTrainResultModel] = useState(undefined);
    const [fitResultModel, setFitResultModel] = useState(undefined);


    const url = "http://localhost:7000"

    const createAndTrain = async (event) => {
        event.preventDefault()
        setRequesting(true)
        const createModelResponse = await fetch(url + '/create_model/' + model);

        const createResultModel = await createModelResponse.json();
        const createdModel = createResultModel.create_model_response.created_model;
        console.log("Model of Train:", createdModel)
        setTrainResultModel(createdModel)

        if (!createResultModel) {
            setRequesting(false)
            return;
        }

        const fitModelResponse = await fetch(url + '/fit_model/' + createdModel)
        const fitResultModel = await fitModelResponse.json();

        if (!fitResultModel) {
            setRequesting(false)
            return;
        }
        const fittedModel = fitResultModel.fit_model_response;
        console.log(fittedModel)

        setFitResultModel(fittedModel[0].split(":")[1])
        setRequesting(false)
    }

    const simulate = async (event) => {
        event.preventDefault();
        setRequesting(true)
        let value = undefined

        const formData = new FormData(event.target);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        console.log("url: ", url + '/predict/' + fitResultModel)
        console.log("Model: ", fitResultModel)
        console.log("Formulaire: ", formObject)

        try {
            const response = await fetch(url + '/predict/' + fitResultModel, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            value = await response.json();

        } catch (error) {
            console.error('Error:', error.message);
        }

        const prediction = value.predict_response.prediction

        setResult(prediction)
        if (prediction) {
            setTextResult("Votre prêt a été accordé !")
            setSource("https://cdn.discordapp.com/attachments/1065305320735375441/1176528841058033694/mora__please__by_monotsuki_debgleb-fullview.png")
        } else if (prediction === false) {
            setTextResult("Votre prêt a été refusé... Cheh.")
            setSource("https://media.discordapp.net/attachments/1065305320735375441/1176547634727616604/755.png?ex=656f445f&is=655ccf5f&hm=610e8d8c0e95154a8131407317978efe737133cadc1cd0455e2eda5754163f73")
        } else {
            setTextResult("Une erreur est survenue")
            setSource("https://cdn.discordapp.com/attachments/1065305320735375441/1176555150073139272/Capture_decran_2023-11-21_a_17.09.59.png?ex=656f4b5f&is=655cd65f&hm=0907cf3e889bd8069e773fa31663b2a2d9c42dd2d20422216585f88a12f2489e&")
        }
        setRequesting(false)
    };

    return (
        <div className={"App"}>
            <h1>Banque du Nord de Snezhnaya</h1>

            <form onSubmit={createAndTrain}>
                <div>
                    <label>Model: (current {model})</label>

                    <select onChange={(event) => setModel(event.currentTarget.value)}>
                        <option value={"randomforest"}>Random Forest</option>
                        <option value={"logisticregression "}>Logistic Regression</option>
                    </select>
                    <button disabled={requesting} type={"submit"}>Entrainer</button>
                    {
                        requesting ?
                            <img style={{width:"15px"}} src={"https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif"} alt={"loading"}/>
                            : ""
                    }
                </div>
            </form>

            <form onSubmit={simulate}>
                <div className={"inputDiv"}>
                    <label>Somme à payer / mois (Installment)</label>
                    <input id={"installment"} type={"number"} name={"installment"} defaultValue={"35000"}/>
                </div>
                <div className={"inputDiv"}>
                    <label>Logarithme annuel (log.annual.in)</label>
                    <input id={"log_annual_inc"} type={"number"} name={"log_annual_inc"} defaultValue={"100"}/>
                </div>
                <div className={"inputDiv"}>
                    <label>Ration dette/revenu (Dti)</label>
                    <input id={"dti"} type={"number"} name={"dti"} defaultValue={"2"}/>
                </div>
                <div className={"inputDiv"}>
                    <label>Score Fico (300 à 850)</label>
                    <input id={"fico"} type={"number"} name={"fico"} defaultValue={"455"}/>
                </div>
                <div className={"inputDiv"}>
                    <label>Solde renouvelable (revol_bal)</label>
                    <input id={"revol_bal"} type={"number"} name={"revol_bal"} defaultValue={"2000"}/>
                </div>
                <div className={"inputDiv"}>
                    <label>Taux d'utilisation du crédit (revol_util)</label>
                    <input id={"revol_util"} type={"number"} name={"revol_util"} defaultValue={"35"}/>
                </div>
                <div className={"inputDiv"}>
                    <label> Nombre de renseignements/plaintes (inq.last.6mths)</label>
                    <input id={"inq_last_6mths"} type={"number"} name={"inq_last_6mths"} defaultValue={"0"}/>
                </div>
                <div className={"inputDiv"}>
                    <label>Nombre de retard (delinq.2yrs)</label>
                    <input id={"delinq_2yrs"} type={"number"} name={"delinq_2yrs"} defaultValue={"2"}/>
                </div>
                <div className={"inputDiv"}>
                    <label>Nombre de dossiers publics dérogatoires (pub.rec)</label>
                    <input id={"pub_rec"} type={"number"} name={"pub_rec"} defaultValue={"1"}/>
                </div>
                <button disabled={!fitResultModel || requesting} type={"submit"} >Simuler</button>
                {
                    requesting ? 
                        <img style={{width:"15px"}} src={"https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif"} alt={"loading"}/>
                        : ""
                }
            </form>
            {
                result !== undefined ?
                    <div>
                        <p>{textResult}</p>
                        <img src={source}
                             alt={result ? "yes" : "nope"}
                             style={{maxWidth: "300px"}}/>
                    </div>
                    : ""
            }
        </div>
    );
}

export default App;
