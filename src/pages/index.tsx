import Link from 'next/link';
import type { NextPage } from 'next';
import client from 'graphql/apollo';
import { gql } from '@apollo/client';
import { CategoryType } from 'src/Types/CategoryType';
import HeadComponent from 'components/Head/Head';

type HomeProps = {
  categories: CategoryType[];
};

function Home({ categories }: HomeProps) {
  return (
    <main>
      <HeadComponent
        title='Sauny24'
        description='Zapraszamy do zapoznania się z bogatą ofertą saun fińskich, Infrared, Combi, grot solnych. Prawie 20 lat doświadczenia na rynku saunowym w Europie.'
        keywords='producent saun fińskich, infrared, combi, ogrodowych.'
      />

      <h1>Kategorie: </h1>

      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', padding: '30px' }}>
        {categories?.map(({ id, attributes }) => (
          <Link key={id} href={`/produkty?kategoria=${attributes?.Link}`}>
            <a>
              <article
                style={{
                  width: '300px',
                  height: '300px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid red',
                }}
              >
                <h2>{attributes?.Tytul}</h2>
              </article>
            </a>
          </Link>
        ))}
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        kategorias {
          data {
            id
            attributes {
              Tytul
              Link
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      categories: data.kategorias.data,
    },
  };
}

export default Home as NextPage;
