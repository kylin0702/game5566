<?php

namespace App\Admin\Extensions\Imports;

use App\Device;
use App\Device as DataModel;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;

HeadingRowFormatter::
    default('none');

class FirstSheetImport implements ToCollection, WithBatchInserts, WithChunkReading, WithHeadingRow, ToModel
{
    private $round;

    public function __construct(int $round)
    {
        $this->round = $round;
    }

    /**
     * @param array $row
     *
     * @return Model|Model[]|null
     */
    public function model(array $row)
    {
        // 断数据是否
        $device = Device::where('device_no', '=', $row['编号'])->first();
        if ($device) {
            // 存在返回 null
            return null;
        }
        if(empty($row['编号'])){
            return null;
        }
        if(empty($row['mac地址'])){
            $mac=$row['MAC地址'];
        }
        else{
            $mac=$row['mac地址'];
        }
        // 数据库对应的字段
        return new DataModel([
            'device_no' => $row['编号'],
            'mac' => $mac,
            'lockKey' => $row['蓝牙密码'],
            'blePasswd' => $row['蓝牙密钥'],
        ]);
    }

    public function collection(Collection $rows)
    {
        //
    }

    //批量导入1000条
    public function batchSize(): int
    {
        return 1000;
    }

    //以1000条数据基准切割数据
    public function chunkSize(): int
    {
        return 1000;
    }
}
