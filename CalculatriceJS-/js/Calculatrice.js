/******************************************************************************\
* Auteur: JJK                                                                  *
* Date: 09/01/2020                                                             *
* Description: Calculatrice JavaScript.                                        *
* Version: 0.0a ← C'est-à-àdire bon pour la prod.                              *
* Dernière Modif.: 10/01/2020                                                  *
\******************************************************************************/

class Calculatrice {
    // Constructeur
    constructor(resultat) {
        this.resultat = resultat;
        this.resultatStr = resultat.toString();
        this.operande = "0";
        // La toute première opération doit être une addition pour stocker correctement la valeur dans resultat. Elle sera ensuite écrasé par l'utilisation des boutons de la calculatrice.
        this.operation = '+';
    }

    // OPERATIONS
    add(operande) {
        this.resultat = Number(this.resultat) + Number(operande);
        return this.resultat;
    }

    sub(operande) {
        this.resultat = Number(this.resultat) - Number(operande);
        return Number(this.resultat);
    }

    mult(operande) {
        this.resultat = Number(this.resultat) * Number(operande);
        return Number(this.resultat);
    }

    div(operande) {
        if (operande != 0) {
            this.resultat = Number(this.resultat) / Number(operande);
            return Number(this.resultat);
        }

        //return Number(this.resultat);
        this.resultat = "DIV par 0";
    }

    // Applique l'opération puis met à jour avec la nouvelle opération à prévoir.
    setOperation(op) {

        this.applyOperation();
        this.operation = op;
        this.updateDisplayWithResult();
    }

    // Applique effectivement l'opération entre le résultat intermédiaire et operande en cours. Remet l'opérande à 0 après avoir fait l'opération.
    applyOperation() {
        switch (this.operation) {
            case "+":
                this.add(this.operande);
                break;
            case '-':
                this.sub(this.operande);
                break;
            case '*':
                this.mult(this.operande);
                break;
            case '/':
                this.div(this.operande);
                break;
            case '=':
                this.operation = '=';
                break; // Useless yet rigorous. User will click on an operation before adding further operand.
            default:
                this.resultatStr = this.operande;
                this.resultat = Number(this.resultatStr); //
        }

        this.resultatStr = this.resultat.toString();
        this.clearOperand();
    }

    // Fonctions sur les chaines de l'affichage.

    // Ajoute un digit à l'opérande selon les règles prévues.
    addDigit(digit) {
        if (this.operation == '=')
            this.clearAllOps();

        if (this.operande == "0") {
            if (digit == '.') {
                this.operande = this.operande + digit
            } else {
                this.operande = digit;
            }
        } else {
            // TODO
            if (digit != '.') {
                this.operande = this.operande + digit
            } else {
                if (!this.operande.includes('.')) {
                    this.operande = this.operande + digit;

                }
            }

        }
        this.updateDisplayWithOperand();
        return this.operande;
    }

    // Retire un digit à l'opérande. Si l'opérande est 0 alors ne fait rien.
    removeDigit() {
        // 
        if (this.operande.length > 1) {
            this.operande = this.operande.substring(0, this.operande.length - 1);
        } else {
            this.operande = "0";
        }

        this.updateDisplayWithOperand();
        return this.operande;
    }

    // Inverse le signe de l'opération.
    invertSign() {
        // Si signe moins on supprime le moins du début.
        if (this.operation == '=') {
            //this.resultat.toString().
            if (this.resultatStr.charAt(0) == "-") {
                this.resultatStr = this.resultatStr.substring(1, this.resultatStr.length);
            } else {
                this.resultatStr = "-" + this.resultatStr;
            }

            this.resultat = Number(this.resultatStr);

            this.updateDisplayWithResult();
        } else {
            if (this.operande.charAt(0) == "-") {
                this.operande = this.operande.substring(1, this.operande.length);
            } else {
                this.operande = "-" + this.operande;
            }

            this.updateDisplayWithOperand();
        }

    }

    // Met à jour l'affichage
    updateDisplayWithResult() {
        let display = document.getElementById("affichage");
        display.innerHTML = this.resultat;
        this.dispInternals();
    }

    // Met à jour l'affichage
    updateDisplayWithOperand() {
        let display = document.getElementById("affichage");
        display.innerHTML = this.operande;
        this.dispInternals();
    }

    // Fonctions liées aux opérations complémentaires
    clearAllOps() {
        this.resultat = 0;
        this.resultatStr = "0";
        this.clearOperand();
        this.operation = '+';

        this.updateDisplayWithResult(); // Indifférent. On aurait pu afficher l'opérande.
    }

    clearOperand() {
        this.operande = 0;
        this.updateDisplayWithOperand();
    }

    // Fonction ultra utile pour comprendre ce qui se passe et déboguer.
    dispInternals() {
        console.log("[ resultat: " + this.resultat + ", resultatStr: " + this.resultatStr + ", operation: " + this.operation + ", operande: " + this.operande + "]");
    }
}

function main() {
    // Active ou désactive les sortie de test.
    const DEBUG = false;

    console.log("Starting the calculator.");

    if (DEBUG)
        TestCalculatrice();
}

// Création d'une instance de calculatrice.
var calc = new Calculatrice(0);

// Fonction de test rapide. A permis de résoudre un bug. ← C'est utile les tests.
function TestCalculatrice() {
    console.log("Testing operations");
    console.log(calc.add(10)); //10
    console.log(calc.mult(2)); // 20
    console.log(calc.sub(2)); // 18
    console.log(calc.div(3)); // 6
    console.log("Testing string functions");
    console.log(calc.addDigit("5")); //5
    console.log(calc.removeDigit()); // 0
    console.log(calc.removeDigit()); // 0
    console.log(calc.removeDigit()); // 0
    console.log(calc.removeDigit()); // 0
    console.log(calc.addDigit("5")); //5
    console.log(calc.addDigit("6")); //6
    console.log(calc.addDigit("4")); //4
    console.log(calc.removeDigit()); // 56
    console.log(calc.removeDigit()); // 5
    console.log(calc.removeDigit()); // 0
}
