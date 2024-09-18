## [![Deploy Next.js site to Pages](https://github.com/sudo-self/floater-b/actions/workflows/nextjs.yml/badge.svg)](https://github.com/sudo-self/floater-b/actions/workflows/nextjs.yml)
<img width="1440" alt="nextjs" src="https://github.com/user-attachments/assets/83df2555-408e-42fd-91a6-727a3e16f1f8">
<img width="1440" alt="npx" src="https://github.com/user-attachments/assets/b690f056-e4d5-42e4-8abc-850ae02d4f08">



## npx

```
npx floater-xyz
```


##  api

```
curl -X POST https://floater.jessejesse.xyz/api/floater \
   -H "Content-Type: application/json" \
   -d '{
         "tooltipText": "Floater B.",
         "iframeSrc": "https://floater.jessejesse.xyz",
         "imageURL": "https://floater.jessejesse.xyz/favicon-32x32.png",
         "labelTextColor": "#FFFFFF"
       }
```

## appending

```
<script>
  // JavaScript snippet from the server
  (function() {
    class FloaterButton {
    
    }

    document.addEventListener('DOMContentLoaded', () => {
      new FloaterButton({
        tooltipText: 'Floater B.',
        iframeSrc: 'https://floater.jessejesse.xyz',
        imageURL: 'https://example.com/image.png',
        labelTextColor: '#ffffff'
      });
    });
  })();
</script>
```


