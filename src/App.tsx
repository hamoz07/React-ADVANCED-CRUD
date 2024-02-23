import { ChangeEvent, FormEvent, useState } from "react";
import Product from "./components/Product.tsx";
import Modal from "./components/Ui/Modal.tsx";
import {
  categories,
  colors,
  formInputsList,
  productList,
} from "./data/data.ts";
import Button from "./components/Ui/Button.tsx";
import Input from "./components/Ui/Input.tsx";
import { ICategory, IProduct } from "./interfaces/index.ts";
import { productValidator } from "./validation/index.ts";
import ErrorMsg from "./components/Ui/ErrorMsg.tsx";
import ProdColor from "./components/Ui/ProdColor.tsx";
import { v4 as uuid } from "uuid";
import SelectBox from "./components/Ui/SelectBox.tsx";
import useLocalstorage from "./customHooks/useLocalStorage.tsx";

function App() {
  /* ====== States ====== */
  const defaultVal = {
    description: "",
    title: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [targetedProduct, setTargetedProduct] = useState<IProduct>(defaultVal);
  const [targetedProductI, setTargetProductI] = useState<number>(0);
  const [choosenColors, setChoosenColors] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    description: "",
    title: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [prods, setProds] = useLocalstorage("products", productList);
  const [input, setInput] = useState<IProduct>(defaultVal);
  const [selected, setSelected] = useState<ICategory>(categories[1]);
  // const productsString = localStorage.getItem("products");
  // const products: IProduct[]  = productsString ? JSON.parse(productsString) : [];

  /* ====== Handlers ====== */
  const onClose = () => {
    setIsOpen(false);
    setErrors({
      description: "",
      title: "",
      imageURL: "",
      price: "",
      colors: "",
    });
  };
  const onEditClose = () => {
    setIsEditOpen(false);
    setTargetedProduct(defaultVal);
    setErrors({
      description: "",
      title: "",
      imageURL: "",
      price: "",
      colors: "",
    });
  };
  const onOpen = () => {
    setIsOpen(true);
  };
  const onEditOpen = () => {
    setIsEditOpen(true);
  };
  const onOpenDelModal = () => {
    setIsDelOpen(true);
  };
  const changeVal = (ev: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [ev.target.name]: ev.target.value,
    });
    setErrors({ ...errors, [ev.target.name]: "" });
  };
  const changeEditVal = (ev: ChangeEvent<HTMLInputElement>) => {
    setTargetedProduct({
      ...targetedProduct,
      [ev.target.name]: ev.target.value,
    });
    setErrors({ ...errors, [ev.target.name]: "" });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description, price, imageURL } = input;

    const myErrors = productValidator({
      title,
      description,
      price,
      imageURL,
      colors: choosenColors,
    });

    const hasErrMsg =
      Object.values(myErrors).every((x) => x === "") &&
      Object.values(myErrors).some((x) => x === "");

    if (!hasErrMsg) {
      setErrors(myErrors);
      return;
    }

    setProds((prev: IProduct[]) => [
      ...prev,
      { ...input, colors: choosenColors, id: uuid(), category: selected },
    ]);
    setInput(defaultVal);
    setChoosenColors([]);
    setErrors({ ...errors, [ev.target.name]: "" });
    onClose();
  };
  const onEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description, price, imageURL } = targetedProduct;

    const myErrors = productValidator({
      title,
      description,
      price,
      imageURL,
    });

    const hasErrMsg =
      Object.values(myErrors).every((x) => x === "") &&
      Object.values(myErrors).some((x) => x === "");

    if (!hasErrMsg) {
      setErrors(myErrors);
      return;
    }

    const updatedProds = [...prods];
    updatedProds[targetedProductI] = {
      ...targetedProduct,
      colors: choosenColors.concat(targetedProduct?.colors),
      category: selected,
    };

    setProds(updatedProds);
    setTargetedProduct(defaultVal);
    setChoosenColors([]);
    setErrors({
      description: "",
      title: "",
      imageURL: "",
      price: "",
      colors: "",
    });
    onEditClose();
  };
  const onDel = () => {
    const final = prods.filter(
      (pro: IProduct) => pro.id !== targetedProduct.id
    );
    setProds(final);
    onDelCancel();
    setTargetedProduct(defaultVal);
  };

  const onCancel = () => {
    setInput(defaultVal);
    setTimeout(() => {
      onClose();
    }, 200);
  };
  const onEditCancel = () => {
    onEditClose();
  };
  const onDelCancel = () => {
    setIsDelOpen(false);
  };
  /* ====== Render ====== */
  const prodList = Array.isArray(prods)
    ? prods.map((p: IProduct, i: number) => (
        <Product
          key={p.id}
          pro={p}
          onEditOpen={onEditOpen}
          setTargetedProduct={setTargetedProduct}
          i={i}
          setTargetProductI={setTargetProductI}
          onOpenDelModal={onOpenDelModal}
        />
      ))
    : null;

  const InputList = formInputsList.map((inp) => (
    <div className="mb-3 flex flex-col gap-2" key={inp.id}>
      <label htmlFor={inp.id} className="font-medium text-gray-600">
        {inp.label}
      </label>
      <Input
        type={inp.type}
        id={inp.id}
        name={inp.name}
        onChange={changeVal}
        value={input[inp.name]}
        className="py-3 px-3
        rounded-lg
      border-[2px] border-gray-300 focus:border-indigo-500
      focus:outline-none
      text-md
      focus:ring-2
      focus:ring-indigo-500
      "
      />
      <ErrorMsg msg={errors[inp.name]} />
    </div>
  ));
  const EditInputList = formInputsList.map((inp) => (
    <div className="mb-3 flex flex-col gap-2" key={inp.id}>
      <label htmlFor={inp.id} className="font-medium text-gray-600">
        {inp.label}
      </label>
      <Input
        type={inp.type}
        id={inp.id}
        name={inp.name}
        onChange={changeEditVal}
        value={targetedProduct[inp.name]}
        className="py-3 px-3
        rounded-lg
      border-[2px] border-gray-300 focus:border-indigo-500
      focus:outline-none
      text-md
      focus:ring-2
      focus:ring-indigo-500
      "
      />
      <ErrorMsg msg={errors[inp.name]} />
    </div>
  ));

  const ColorsList = colors.map((inp) => {
    return (
      <ProdColor
        color={inp}
        key={inp}
        onClick={() => {
          if (choosenColors.includes(inp)) {
            setChoosenColors((p) => p.filter((c) => c !== inp));
            return;
          }
          if (targetedProduct?.colors?.includes(inp)) {
            setChoosenColors((p) => p.filter((c) => c !== inp));
            return;
          }
          setChoosenColors((prev) => {
            setErrors({ ...errors, colors: "" });
            return [...prev, inp];
          });
        }}
      />
    );
  });

  return (
    <main className="md:container">
      {/* Landing introduction component */}
      {/* <div></div> */}
      {/* Products */}
      <Button
        className="bg-indigo-700 p-3 mt-9 flex mx-auto"
        width="w-fit"
        txt="Add"
        onClick={onOpen}
      />
      <section className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 p-2 m-5 justify-items-center">
        {prods.length === 0 ? <p>no products found</p> : prodList}
      </section>
      <Modal title="Add a new product" isOpen={isOpen} onClose={onClose}>
        <form  onSubmit={onSubmit}>

        
        {InputList}

        <SelectBox selected={selected} setSelected={setSelected} />
        <div className="flex space-x-1 items-center mt-3">{ColorsList}</div>
        <ErrorMsg msg={errors["colors"]} />
        <div className="flex flex-wrap space-x-1 items-center mt-2">
          {choosenColors.map((col) => (
            <span
              style={{ background: col }}
              className="rounded-md p-1 text-xs text-white mr-1 mb-1"
              key={col}
            >
              {col}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Button
            className="py-2 bg-indigo-700"
            txt="Add"
           
            type="submit"
          />
          <Button
            className="py-2 bg-gray-400"
            txt="cancel"
            onClick={onCancel}
          />
        </div>
        </form>
      </Modal>
      <Modal title="Edit product" isOpen={isEditOpen} onClose={onEditClose}>
        <form onSubmit={onEdit}>
        {EditInputList}
        <ErrorMsg msg={errors["colors"]} />
        <SelectBox
          selected={targetedProduct?.category}
          setSelected={(val) =>
            setTargetedProduct({ ...targetedProduct, category: val })
          }
        />
        <div className="flex space-x-1 items-center mt-2 mb-2">
          {ColorsList}
        </div>
        <div className="flex flex-wrap space-x-1 items-center mt-2 mb-3">
          {/* <span style={{background: choosenColors}}>{choosenColors}</span> */}
          {choosenColors.concat(targetedProduct?.colors)?.map((col) => (
            <span
              style={{ background: col }}
              className="rounded-md p-1 text-xs text-white mr-1 mb-1"
              key={col}
            >
              {col}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="py-2 bg-indigo-700"
            txt="Edit"
            type="submit"
          />
          <Button
            className="py-2 bg-gray-400"
            txt="cancel"
            onClick={onEditCancel}
          />
        </div>
        </form>
      </Modal>
      <Modal title="Are you sure ?" isOpen={isDelOpen} onClose={onDelCancel}>
        <div className="flex items-center gap-2">
          <Button
            className="py-2 bg-red-700"
            txt="yes, Remove"
            onClick={onDel}
          />
          <Button
            className="py-2 bg-gray-400"
            txt="cancel"
            onClick={onDelCancel}
          />
        </div>
      </Modal>
    </main>
  );
}

export default App;
