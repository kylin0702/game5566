<?php

namespace App\Admin\Extensions\Imports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use App\Admin\Extensions\Imports\FirstSheetImport;

class DataExcel implements WithMultipleSheets
{
    private $round;

    public function __construct(int $round)
    {
        $this->round = $round;
    }

    public function sheets(): array
    {
        return [
            new FirstSheetImport($this->round),
        ];
    }
}
