AI INCEPTION - Kundenservice Chatbot
------------------------------------

1. Öffne https://render.com
2. Klicke oben rechts auf "New" → "Web Service"
3. Wähle "Deploy from ZIP" und lade AI_Inception_Bot.zip hoch
4. Wenn Render fragt:
   - Build Command: npm install
   - Start Command: node server.js
5. Nach Upload:
   - Gehe auf "Environment" → Add variable → Key: OPENAI_API_KEY → Value: dein OpenAI-Key
6. Klicke "Save" → "Restart Service"
7. Fertig. Dein Chatbot ist online.
8. Füge den folgenden Code in die Webseite deines Kunden ein:

   <div id="aiinception-chat-root"></div>
   <script>
     (function(){
       const serverUrl = "https://DEIN-BOTNAME.onrender.com";
       const iframe = document.createElement('iframe');
       iframe.src = serverUrl;
       iframe.style = "position:fixed;right:20px;bottom:20px;width:360px;height:520px;border:none;border-radius:12px;z-index:99999;";
       document.getElementById('aiinception-chat-root').appendChild(iframe);
     })();
   </script>
