import Button from "./Ui/Button";
import Image from "./Image";
import { IProduct } from "../interfaces";
import { productDescTxtSlicer, validDigits } from "../utils/functions";
import ProdColor from "./Ui/ProdColor";

interface IProductProps {
  pro: IProduct;
  setTargetProductI: (i: number) => void;
  onEditOpen: () => void;
  setTargetedProduct: (pro: IProduct, callback?: () => void) => void;
  i: number;
  onOpenDelModal: () => void;
}

const Product = ({
  pro,
  onEditOpen,
  setTargetedProduct,
  setTargetProductI,
  i,
  onOpenDelModal,
}: IProductProps) => {
  const onOpenEditModal = () => {
    setTargetedProduct(pro);
    onEditOpen();
    setTargetProductI(i);
  };
  const onSendProdData = () => {
    setTargetedProduct(pro);
    onOpenDelModal();
  };

  const ColorsList = pro.colors.map((inp) => (
    <ProdColor color={inp} key={inp} />
  ));
  return (
    <article className="max-w-sm md:max-w-lg mx-auto lg:h-[400px] md:mx-0 border-gray-100 border-2 flex flex-col rounded-md p-2">
      <Image
        src={pro.imageURL}
        alt={`${pro.title} image`}
        imageclass="rounded-md h-52 w-full object-cover mb-2"
      />
      <h3>{pro.title}</h3>
      <p
        className={`text-sm text-gray-600 mt-1${
          productDescTxtSlicer(pro.description).length >= 50 &&
          " cursor-pointer"
        }`}
      >
        {productDescTxtSlicer(pro.description)}
      </p>
      <div className="flex space-x-1 items-center my-2">{ColorsList}</div>
      <div className="items-center flex justify-between">
        <span className="font-extrabold text-sm text-indigo-700">
          ${validDigits(pro.price)}
        </span>
        <div className="items-center space-x-1 flex">
          <Image
            src={pro.category.imageURL}
            alt="product image price"
            imageclass="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-sm">{pro.category.name}</span>
        </div>
      </div>
      <div className="items-center justify-between flex gap-2 flex-col md:flex-row mt-3">
        <Button
          className="py-2 bg-indigo-700"
          txt="Edit"
          onClick={onOpenEditModal}
        />
        <Button
          className="py-2 bg-red-700"
          txt="Destroy"
          onClick={onSendProdData}
        />
      </div>
    </article>
  );
};

export default Product;
