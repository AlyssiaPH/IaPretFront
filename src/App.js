import './App.css';
import {useState} from "react";

function App() {
    const [result, setResult] = useState(undefined);
    const [source, setSource] = useState(undefined);

    const myFunction = async (event) => {
        event.preventDefault();
        let value = undefined

        const formData = new FormData(event.target);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        try {
            const response = await fetch('http://127.0.0.1:8000/request', {
                method: 'POST',
                headers: {
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

        setResult(value === true)
        if (value) {
            setSource("https://cdn.discordapp.com/attachments/1065305320735375441/1176528841058033694/mora__please__by_monotsuki_debgleb-fullview.png")
        } else if (value === false) {
            setSource("https://media.discordapp.net/attachments/1065305320735375441/1176547634727616604/755.png?ex=656f445f&is=655ccf5f&hm=610e8d8c0e95154a8131407317978efe737133cadc1cd0455e2eda5754163f73")
        } else {
            setSource("https://cdn.discordapp.com/attachments/1065305320735375441/1176555150073139272/Capture_decran_2023-11-21_a_17.09.59.png?ex=656f4b5f&is=655cd65f&hm=0907cf3e889bd8069e773fa31663b2a2d9c42dd2d20422216585f88a12f2489e&")
        }
    };

    return (
        <div className={"App"}>
            <form onSubmit={myFunction}>
                <h1>Banque du Nord de Snezhnaya</h1>
                <p>
                    <div className={"inputDiv"}>
                        <label>Somme à payer / mois (Installment)</label>
                        <input id={"installment"} type={"number"} name={"installment"}/>
                    </div>
                    <div className={"inputDiv"}>
                        <label>Logarithme annuel (log.annual.in)</label>
                        <input id={"annual_log"} type={"number"} name={"annual_log"}/>
                    </div>
                    <div className={"inputDiv"}>
                        <label>Ration dette/revenu (Dti)</label>
                        <input id={"dti"} type={"number"} name={"dti"}/>
                    </div>
                    <div className={"inputDiv"}>
                        <label>Score Fico (300 à 850)</label>
                        <input id={"fico"} type={"number"} name={"fico"}/>
                    </div>
                    <div className={"inputDiv"}>
                        <label>Solde renouvelable (revol_bal)</label>
                        <input id={"revol_bal"} type={"number"} name={"revol_bal"}/>
                    </div>
                    <div className={"inputDiv"}>
                        <label>Taux d'utilisation du crédit (revol_util)</label>
                        <input id={"revol_util"} type={"number"} name={"revol_util"}/>
                    </div>
                    <div className={"inputDiv"}>
                        <label> Nombre de renseignements/plaintes (inq.last.6mths)</label>
                        <input id={"inq_last_6mth"} type={"number"} name={"inq_last_6mth"}/>
                    </div>
                    <div className={"inputDiv"}>
                        <label>Nombre de retard (delinq.2yrs)</label>
                        <input id={"delinq_2yrs"} type={"number"} name={"delinq_2yrs"}/>
                    </div>
                    <div className={"inputDiv"}>
                        <label>Nombre de dossiers publics dérogatoires (pub.rec)</label>
                        <input id={"pub_rec"} type={"number"} name={"pub_rec"}/>
                    </div>
                    <button type={"submit"}>Simuler</button>
                </p>

            </form>
            {
                result !== undefined ?
                    <img src={source}
                         alt={result ? "yes" : "nope"}
                    style={{maxWidth:"300px"}}/>
                    : ""
            }
        </div>
    );
}

export default App;
