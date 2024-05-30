import React, { useState } from 'react';
import { Dropdown, Image, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

 function UniqueForm({ fields, dropwdowns, categorias }) {
  const handleCategoryChange = (keys) => {
    // Extraer el primer valor del objeto Set
    const selectedKey = keys.values().next().value;

    // Buscar la categoría correspondiente a la clave seleccionada
    const selectedCategoria = categorias.find(categoria => categoria.id_tipo === selectedKey);

    // Obtener el nombre de la categoría
    const nombreCategoria = selectedCategoria ? selectedCategoria.Detalle : '';

    setSelectedCategory(nombreCategoria);
  };

  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <form>
      {fields.map((field, index) => (
        <div key={index} className='mb-5'>
          <label>{field.label}</label>
          <input type={field.type} placeholder={field.placeholder}/>
        </div>
      ))}

      {dropwdowns ? (
        dropwdowns.map((dropwdown, index) => (
          <Dropdown key={index} backdrop="blur">
            <DropdownTrigger>
              <Button variant="bordered" color='secondary' className="capitalize">
                {selectedCategory || 'Seleccione una opción'}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Selección de categoría"
              disallowEmptySelection
              variant='faded'
              color='secondary'
              selectionMode="single"
              selectedKeys={selectedCategory ? [selectedCategory] : []}
              onSelectionChange={handleCategoryChange}
            >
              {dropwdown.options.map((option, optionIndex) => (
                <DropdownItem key={optionIndex} value={option.value}>
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        ))
      ) : (
        <div></div>
      )}
    </form>
  );
};

export default UniqueForm;

