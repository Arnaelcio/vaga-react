import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/Payments.css";
import { addCart } from "../../actions/CartAction";

function Payment({ label, onClick }) {
  const { cart } = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();
  const [payData, setPayData] = useState(false);
  const [namePayData, setNamePayData] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [numberCardInput, setNumberCardInput] = useState("");
  const [validityCardInput, setValidityCardInput] = useState("");
  const [cvvCardInput, setCvvCardInput] = useState("");
  const [total, setTotal] = useState("");

  const showPaydata = (e) => {
    setPayData(true);
    setNamePayData(e);
    getTotal();
  };

  const getTotal = () => {
    const res = cart.reduce((prev, item) => {
      return prev + item.valor * item.count;
    }, 0);
    setTotal(res);
  };
  const showAlertTicketView = (e) => {
    e.preventDefault();
    if ([nameInput, total].includes("")) {
      alert("all fields are mandatory");
    } else {
      alert(`
    Boleto Gerado com sucesso

    Nome do Sacado: ${nameInput}    
    Valor R$: ${total.toFixed(2)}
    Data de Emissão: ${Date()}
    `);
      while (cart.length > 0) {
        cart.pop();
      }
      dispatch(addCart(cart));
    }
  };

  const showAlertCardView = (e) => {
    e.preventDefault();
    if (
      [nameInput, numberCardInput, validityCardInput, cvvCardInput].includes("")
    ) {
      alert("all fields are mandatory");
    } else {
      alert(`
    Cartão cadastrado e compra efetuada com sucesso!!

    Nome do Titular: ${nameInput}
    cartão Nº: ${numberCardInput}    
    validade: ${validityCardInput}    
    cartão Nº: ${cvvCardInput}    
    Valor R$: ${total.toFixed(2)}
    Data de Emissão: ${Date()}
    `);
      while (cart.length > 0) {
        cart.pop();
      }
      dispatch(addCart(cart));
    }
  };

  const confirmOrder = (e) => {
    e.preventDefault();
    if ([nameInput].includes("")) {
      alert("all fields are mandatory");
    } else {
      alert(`
    Pedido efetuado com sucesso!!

    Nome do Titular: ${nameInput}
    pedido Nº: ${Math.floor(Math.random() * 999999999)}    
    Valor R$: ${total.toFixed(2)}
    Data de Emissão: ${Date()}
    `);
      while (cart.length > 0) {
        cart.pop();
      }
      dispatch(addCart(cart));
    }
  };
  const selectOnlyThis = (id)=> {
    for (var i = 1;i <= 3; i++)
    {
        document.getElementById("Check" + i).checked = false;
    }
    document.getElementById(id).checked = true;
}
  return (
    <>
      <div className="payment">
        <h2>Payment</h2>
        <span onClick={onClick}>{label}</span>
        <form>
          <fieldset className="details-payment cart">
            <legend>Cadastrar Dados</legend>
            <label>
              Nome
              <input onChange={(e) => setNameInput(e.target.value)}></input>
            </label>
            <label className="pgto">
              <p>Forma de Pgto</p>
              <div className="check">
                <label htmlFor="Check1">
                  <input
                    name="Boleto"
                    id="Check1"
                    type="checkBox"
                    onClick={(e) => {showPaydata(e.target.name); selectOnlyThis(e.target.id)}}
                  ></input>
                  <span>Boleto</span>
                </label>
                <label htmlFor="Check2">
                  <input
                    name="À Vista"
                    id="Check2"
                    type="checkBox"
                    onClick={(e) => {showPaydata(e.target.name); selectOnlyThis(e.target.id)}}
                  ></input>
                  <span>À Vista</span>
                </label>
                <label htmlFor="Check3">
                  <input
                    name="Cartão"
                    id="Check3"
                    type="checkBox"
                    onClick={(e) => {showPaydata(e.target.name); selectOnlyThis(e.target.id)}}
                  ></input>
                  <span>Cartão</span>
                </label>
              </div>
            </label>
          </fieldset>
          {!!payData ? (
            <fieldset className="details-payment cart">
              <legend>{namePayData}</legend>
              {namePayData === "Cartão" ? (
                <>
                  <label>
                    Numero do Cartão
                    <input
                      onChange={(e) => setNumberCardInput(e)}
                      type="Number"
                    ></input>
                  </label>
                  <label>
                    Data de Validade
                    <input
                      onChange={(e) => setValidityCardInput(e.target.value)}
                      type="Text"
                    ></input>
                  </label>
                  <label>
                    CVV
                    <input
                      onChange={(e) => setCvvCardInput(e.target.value)}
                      type="Number"
                    ></input>
                  </label>
                  <button onClick={(e) => showAlertCardView(e)}>
                    Efetuar Cadastro e Pgto
                  </button>
                </>
              ) : namePayData === "Boleto" ? (
                <label>
                  <div>
                    <label>Boleto à Gerar</label>
                    <br></br>
                    <div>Valor Total: R${total.toFixed(2)} </div>
                    <br></br>
                    <div>Data: {Date()}</div>
                    <button
                      onClick={(e) => {
                        showAlertTicketView(e);
                      }}
                    >
                      Confirmar compra e Gerar Boleto
                    </button>
                  </div>
                </label>
              ) : namePayData === "À Vista" ? (
                <label>
                  <div>
                    <div>Passe em uma de nossas lojas</div>
                    <div>Leve o código do pedido</div>
                  </div>
                  <button onClick={(e) => confirmOrder(e)}>
                    Confirmar pedido e Gerar Código
                  </button>
                </label>
              ) : null}
            </fieldset>
          ) : null}
        </form>

        {/* {cart.map((item, index) => (
              <div className="details-payment cart" key={index}>
                <img src={item.tagImg} alt="img-item" />
                <div className="box">
                  <div className="row">
                    <h2>{item.titulo}</h2>
                    <span>R$ {(item.valor * item.count).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))} */}
      </div>
    </>
  );
}

export default Payment;
