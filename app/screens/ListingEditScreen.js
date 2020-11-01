import React from 'react';
import * as Yup from 'yup';

import {AppForm, AppFormField, AppFormPicker, SubmitButton} from '../components/forms/index';
import Screen from '../components/Screen';

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    location : Yup.string().required().min(1).label("Location"),
    description: Yup.string().label("Description"),
    category: Yup.object().required().nullable().label("Category")
})

const categories = [
    {label: "Solo", value: 1},
    {label: "Band", value: 2},
    {label: "Manager", value: 3},
    {label: "Customer", value: 4}
]

function ListingEditScreen(props) {
    return (
        <Screen>
            <AppForm 
             initialValues={{
                 title: "",
                 location: "",
                 description: "",
                 category: null
             }}
             onSubmit={(values) => console.log(values)}
             validationSchema={validationSchema}>
                 <AppFormField maxLength={255} name="title" placeholder="Title" />
                 <AppFormField maxLength={140} name="location" placeholder="Location" width={120}/>
                 <AppFormPicker
                 items={categories}
                 name="category"
                 placeholder="Category"/>
                 <AppFormField 
                 maxLength={255}
                 multiline
                 name="description"
                 numberOfLines={3}
                 placeholder="Description" />
                 <SubmitButton title="Post"/>
            </AppForm>
        </Screen>
    );
}

export default ListingEditScreen;