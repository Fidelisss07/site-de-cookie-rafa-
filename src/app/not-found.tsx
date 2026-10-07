import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="Erro 404" title="Essa fornada não existe." text="A página que você procura não foi encontrada." />
      <div className="bg-espresso pb-24">
        <div className="container-x">
          <ButtonLink href="/">Voltar ao início</ButtonLink>
        </div>
      </div>
    </>
  );
}
