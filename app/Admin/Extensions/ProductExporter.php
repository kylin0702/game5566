<?php
namespace App\Admin\Extensions;

use Encore\Admin\Grid\Exporters\ExcelExporter;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use App\ProductType;
use App\ProductCell;
class ProductExporter extends ExcelExporter implements WithMapping,ShouldAutoSize
{
    protected $fileName ="商品列表.xlsx";


    protected $columns = [
        'name'   => '商品名称',
        'typeid'   => '分类名称',
        'price'   => '商品价格',
        'cellid'   => '所在格子',
        'created_at'   => '添加时间',
        'updated_at'   => '更新时间',
];
    public function map($product): array
    {
        $price=empty($product)?"0.00":sprintf("%.2f",$product->price);

        $type=ProductType::findOrFail($product->typeid);
        $cell=ProductCell::findOrFail($product->cellid);
        $type_name=empty($type)?"":$type->type_name;
        $cell_name=empty($cell)?"":$cell->cell_name;
        return [
            $product->name,
            $type_name,
            $price,
            $cell_name,
            $product->created_at,
            $product->updated_at,
        ];
    }

}
