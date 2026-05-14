"use client";
        placeholder="Название"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <Input
        type="number"
        placeholder="Цена"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
      />

      <div className="flex gap-4">
        <Select
          value={category}
          onValueChange={setCategory}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="apartment">
              Квартира
            </SelectItem>

            <SelectItem value="car">
              Машина
            </SelectItem>

            <SelectItem value="clothes">
              Одежда
            </SelectItem>

            <SelectItem value="travel">
              Отдых
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={priority}
          onValueChange={setPriority}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="urgent">
              Срочно
            </SelectItem>

            <SelectItem value="wait">
              Подождет
            </SelectItem>

            <SelectItem value="dream">
              Хочу
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={createPurchase}
        className="w-full"
      >
        Добавить покупку
      </Button>
    </div>
  );
}