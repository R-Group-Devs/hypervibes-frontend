import { appendFileSync } from 'fs';

const ascii = `

<!--

            "We only have room
             for one specimen.
           Which shall we take?"     "HyperVIBES."

                     \\  _.-'~~~~'-._   /
              .      .-~ \\__/  \\__/ ~-.         .
                   .-~   (oo)  (oo)    ~-.
                  (_____//~~\\\\//~~\\\\______)
             _.-~\`                         \`~-._
            /O=O=O=O=O=O=O=O=O=O=O=O=O=O=O=O=O=O\\     *
            \\___________________________________/
                       \\x x x x x x x/
               .  *     \\x_x_x_x_x_x/



      @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
       @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @

-->
`;

appendFileSync('./build/index.html', ascii, 'utf8');
