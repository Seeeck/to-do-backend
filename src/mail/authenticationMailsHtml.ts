

const linkVerifyTokenHtml = (token: string) => {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Verificación de cuenta</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.5.0/dist/css/bootstrap.min.css">
  <style>
    .custom-card {
      border: none;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card p-4 mx-auto custom-card" style="max-width: 50%;">
      <header class="bg-primary text-white text-center py-3">
        <h1>Verificación de cuenta</h1>
      </header>
      
      <div class="mt-4">
        <h2>Pinche este <a href="https://ejemplo.com/verificar?token=${token}">link</a> para verificar la cuenta</h2>
      </div>
    </div>
  </div>
</body>
</html>
`;

    return html;
}

export { linkVerifyTokenHtml };