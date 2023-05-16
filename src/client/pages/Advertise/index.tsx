import React from "react"
import Layout from '../../layout';
import { Forms } from "../../components/Forms";
import { FormsField } from "../../components/Forms/FormsField";
import { FormsGetter } from "../../components/Forms/forms-data";

export default function Advertise() {Forms
  async function handleSubmit(data: FormsGetter) {
    const image = await data.readFile('image', {encoding: 'data-url'});

    console.log(image);
  }

  return (
    <Layout>
      <Forms onSubmit={handleSubmit}>
        <FormsField name='name' type='text' title='Nome do produto' />
        <FormsField name='price' type='text' title='Preço do produto' />
        <FormsField name='description' type='text' title='Descrição' />
        <FormsField name='image' type='file' multiple />
        <FormsField type='submit' value='Confirmar' />
      </Forms>
    </Layout>
  )
} 