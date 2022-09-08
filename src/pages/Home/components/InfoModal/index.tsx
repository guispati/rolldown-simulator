import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, Title } from './styles';
import { X } from 'phosphor-react';

export function InfoModal() {
    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <div>
                    <Title>Sobre</Title>
                    <p>Este é um simulador do jogo Teamfight Tactics (TFT) desenvolvido para web. Este é um projeto educacional, portanto, sem fins lucrativos e ainda é um projeto em desenvolvimento, portanto bugs ainda podem ser encontrados e novas funcionalidades podem ser inseridas a qualquer momento. O objetivo é ser o mais fiel possível do jogo oficial publicado pela Riot Games e todas as funcionalidades do Shop do TFT são as mesmas. </p>
                </div>

                <div>
                    <Title>Como jogar</Title>
                    <p>Campeões podem ser comprados clicando em seus ícones no shop, fazendo eles aparecerem em seu banco. Esses campeões comprados podem ser movidos, trocados de posição ou vendidos de volta pra loja para ganhar gold. Os botões no lado esquerdo podem ser usados para comprar EXP ou roletar os campeões da loja. O gold exibido é na realidade um input então você pode manualmente editar o seu valor.</p>
                    <p>Todas as bindings (atalhos no teclado) do jogo original se mantém as mesmas nesta versão para web. Portanto, você pode utilizar a tecla "D" para roletar, "F" para comprar EXP ou "E" em cima de um campeão no seu banco para vendê-lo.</p>
                </div>

                <div>
                    <Title>Disclaimer</Title>

                    <p>This project was intended for educational, non-monetary purposes and is in no way affiliated with Riot Games or Teamfight Tactics. All intellectual properties and assets belong to their respective owners. I'm grateful to Riot Games for being supportive of their developers by releasing these assets, and also for making my favorite games! :)</p>
                </div>

                <footer>
                    <p>Qualquer feedback é bem-vindo e você pode entrar em contato comigo pelo Discord ou E-mail:</p>
                    <p>Discord: Spati#8202</p>
                    <p>E-mail: <a href="mailto:guilherme.spati723@gmail.com">guilherme.spati723@gmail.com</a></p>
                    <br />
                    <p>Github: <a href="https://github.com/guispati/rolldown-simulator" target="_blank">https://github.com/guispati/rolldown-simulator</a></p>
                    <p>Desenvolvido com ❤️ por <a href="https://github.com/guispati" target="_blank">Guilherme Spati 😊</a></p>
                </footer>

            </Content>
        </Dialog.Portal>
    );
}