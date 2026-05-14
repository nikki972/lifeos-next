"use client";

          <p className="text-2xl font-bold mt-2">
            {purchase.price} ₽
          </p>

          <div className="flex gap-2 mt-3 flex-wrap">
            <div className="bg-zinc-800 text-sm px-3 py-1 rounded-full">
              {categoryMap[
                purchase.category
              ] || "Другое"}
            </div>

            <div className="bg-blue-500/20 text-blue-400 text-sm px-3 py-1 rounded-full">
              {priorityMap[
                purchase.priority
              ] || "Обычный"}
            </div>
          </div>

          {purchase.status ===
            "completed" && (
            <div className="mt-3 text-green-400 text-sm">
              Куплено
            </div>
          )}
        </div>

        <button
          onClick={() =>
            onToggleFavorite(
              purchase.id,
              purchase.is_favorite
            )
          }
        >
          <Heart
            className={
              purchase.is_favorite
                ? "fill-red-500 text-red-500"
                : "text-zinc-500"
            }
          />
        </button>
      </div>

      <div className="flex gap-2 mt-5">
        <Button
          onClick={() =>
            onToggleStatus(
              purchase.id,
              purchase.status
            )
          }
        >
          <Check />
        </Button>

        <Button
          variant="destructive"
          onClick={() =>
            onDelete(purchase.id)
          }
        >
          <Trash2 />
        </Button>
      </div>
    </Card>
  );
}