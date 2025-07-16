function showForm(paymentMethod) {
  document.getElementById('visa-form').style.display = 'none';
  document.getElementById('mastercard-form').style.display = 'none';
  document.getElementById('paypal-form').style.display = 'none';

  document.getElementById(paymentMethod + '-form').style.display = 'block';
}
