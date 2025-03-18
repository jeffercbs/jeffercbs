const SITE = "https://jeffercbs.tech";

export const NewsletterTemplate = ({ idHash }: { idHash: string }) => {
  return `
    
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter de Jeffercbs</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: #000000;
            color: #ffffff;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #121212;
            border-radius: 8px;
            border: 1px solid #4b0082;
        }
        .content {
            padding: 25px 20px;
            line-height: 1.6;
        }
        .content p {
            margin-bottom: 18px;
            color: #e0e0e0;
            font-size: 16px;
        }
        .btn {
            display: inline-block;
            padding: 12px 28px;
            color: #ffffff;
            background: linear-gradient(135deg, #9370DB, #4b0082);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
            box-shadow: 0 4px 8px rgba(75, 0, 130, 0.3);
            transition: all 0.3s ease;
        }
        .btn:hover {
            background: linear-gradient(135deg, #a17fe0, #5c0e99);
            transform: translateY(-2px);
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #4b0082;
            font-size: 12px;
            color: #888888;
        }
        .code {
            background-color: #1e1e1e;
            padding: 10px;
            border-radius: 5px;
            word-break: break-all;
            font-family: monospace;
            border-left: 3px solid #9370DB;
        }
        .emoji {
            font-size: 20px;
            margin-right: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <p>¡Hey! <span class="emoji">👋</span> ¿Qué tal?</p>
            <p>¡Qué gusto tenerte por aquí! Me alegra un montón que te hayas sumado a mi pequeña comunidad tech. Soy Jeff, y este es mi espacio para compartirte mi experiencia, aprendizajes, mis mejores consejos y mucho más.</p>
            <p>Antes de comenzar a enviarte cositas interesantes, necesito que confirmes tu correo con un simple clic (ya sabes, esas cosas de internet para asegurarnos que eres tú):</p>
            
            <div style="text-align: center;">
                <a href="${SITE}/newsletter?sid=${idHash}" class="btn">¡SÍ, QUIERO RECIBIR EL CONTENIDO!</a>
            </div>
            
            <p>¿El botón no funciona? No hay problema, puedes copiar este enlace directamente:</p>
            <p class="code">${SITE}/newsletter?sid=${idHash}</p>
            
            <p>Estoy preparando un montón de contenido chulo sobre desarrollo, trucos que me han salvado la vida, herramientas que uso a diario y experiencias (incluidos algunos fails épicos de los que podemos aprender juntos).</p>
            
            <p>¡Nos leemos pronto!</p>
            <p>- Jeff</p>
        </div>
        <div class="footer">
            <p>© 2025 jeffercbs | Casi todos los derechos reservados</p>
            <p>Si recibiste esto por error, no te preocupes, solo ignóralo y listo.</p>
        </div>
    </div>
</body>
</html>
    `;
};
