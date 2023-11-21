import './App.css';

function App() {
    return (
        <>
        <form className="App">
            <h1>Banque du Nord de Snezhnaya</h1>
            <p>
                <div class={"inputDiv"}>
                    <label for={"installment"}>Somme à payer / mois (Installment)</label>
                    <input id={"installment"} type={"text"}/>
                </div>
                <div className={"inputDiv"}>
                    <label for={"annual_log"}>Logarithme annuel (log.annual.in)</label>
                    <input id={"annual_log"} type={"text"}/>
                </div>
                <div className={"inputDiv"}>
                    <label for={"dti"}>Ration dette/revenu (Dti)</label>
                    <input id={"dti"} type={"text"}/>
                </div>
                <div className={"inputDiv"}>

                    <label for={"fico"}>Score Fico (300 à 850)</label>
                    <input id={"fico"} type={"text"}/>
                </div>
                <div className={"inputDiv"}>

                    <label for={"revol_bal"}>Solde renouvelable (revol_bal)</label>
                    <input id={"revol_bal"} type={"text"}/>
                </div>
                <div className={"inputDiv"}>

                    <label for={"revol_util"}>Taux d'utilisation du crédit (revol_util)</label>
                    <input id={"revol_util"} type={"text"}/>
                </div>
                <div className={"inputDiv"}>

                    <label for={"inq_last_6mth"}> Nombre de renseignements/plaintes (inq.last.6mths)</label>
                    <input id={"inq_last_6mth"} type={"text"}/>
                </div>
                <div className={"inputDiv"}>

                    <label for={"delinq_2yrs"}>Nombre de retard (delinq.2yrs)</label>
                    <input id={"delinq_2yrs"} type={"text"}/>
                </div>
                <div className={"inputDiv"}>

                    <label for={"pub_rec"}>Mombre de dossiers publics dérogatoires (pub.rec)</label>
                    <input id={"pub_rec"} type={"text"}/>
                </div>
                <button>Simuler</button>
            </p>

        </form>
        </>
    );
}

export default App;
