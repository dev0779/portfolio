const wizardInfo: Record<string, React.ReactNode[]> = {
  customer: [
    <div key="customer-1">
      <strong>Customer information</strong>
      <p>Tell us who will be using the service.</p>
    </div>,
    <div key="customer-2">
      <strong>Contact details</strong>
      <p>We'll use these details to contact you.</p>
    </div>,
  ],

  product: [
    <div key="product-1">
      <strong>Choose your package</strong>
      <p>Select the package that best fits your needs.</p>
    </div>,
  ],

  options: [
    <div key="options-1">
      <strong>Users</strong>
      <p>Choose how many users should have access.</p>
    </div>,

    <div key="options-2">
      <strong>Storage</strong>
      <p>Select the storage capacity for your subscription.</p>
    </div>,
  ],

  payment: [
    <div key="payment-1">
      <strong>Payment method</strong>
      <p>Select how you would like to pay.</p>
    </div>,
  ],
};