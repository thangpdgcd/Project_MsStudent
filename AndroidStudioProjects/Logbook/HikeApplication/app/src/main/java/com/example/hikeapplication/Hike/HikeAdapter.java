package com.example.hikeapplication.Hike;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.FragmentActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hikeapplication.ConnectDb;
import com.example.hikeapplication.MainActivity;
import com.example.hikeapplication.R;

import java.util.ArrayList;
import java.util.List;

public class HikeAdapter extends RecyclerView.Adapter<HikeAdapter.MyViewHolder> implements Filterable {

    private final Context context;
    public List<Hike> hikes;
    private final List<Hike> hikeSearch;

    public HikeAdapter(Context context, FragmentActivity activity, List<Hike> hikes) {
        this.context = context;
        this.hikes = hikes;
        this.hikeSearch = new ArrayList<>(hikes);
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {
        TextView nameHike;
        Button buttonDelete, buttonMore;
        LinearLayout mainLayout;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            nameHike = itemView.findViewById(R.id.nameHike);
            mainLayout = itemView.findViewById(R.id.mainLayoutHikes);
            buttonDelete = itemView.findViewById(R.id.buttonDelete);
            buttonMore = itemView.findViewById(R.id.buttonMore);
        }
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.row_hikes, parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull HikeAdapter.MyViewHolder holder, int position) {
        Hike hike = hikes.get(position);
        holder.nameHike.setText(hike.getName());

        // delete hike
        holder.buttonDelete.setOnClickListener(view -> confirmDelete(hike.getId(), hike.getName()));

        // watch/edit hike
        holder.buttonMore.setOnClickListener(view -> {
            Intent intent = new Intent(context, EditHikeActivity.class);
            intent.putExtra("id", String.valueOf(hike.getId()));
            intent.putExtra("name", hike.getName());
            intent.putExtra("location", hike.getLocation());
            intent.putExtra("date", hike.getDate());
            intent.putExtra("parking", hike.getParking());
            intent.putExtra("length", hike.getLength());
            intent.putExtra("level", hike.getLevel());
            intent.putExtra("description", hike.getDescription());
            context.startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return hikes.size();
    }

    private void confirmDelete(int id, String name) {
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle("Delete hike " + name + " ?");
        builder.setMessage("Are you sure you want to delete this hike?");
        builder.setPositiveButton("Yes", (dialogInterface, i) -> {
            ConnectDb db = new ConnectDb(context);
            db.deleteHike(String.valueOf(id));
            Toast.makeText(context, "Deleted " + name, Toast.LENGTH_SHORT).show();
            context.startActivity(new Intent(context, MainActivity.class));
        });
        builder.setNegativeButton("No", (dialogInterface, i) -> dialogInterface.dismiss());
        builder.create().show();
    }

    @Override
    public Filter getFilter() {
        return new Filter() {
            @Override
            protected FilterResults performFiltering(CharSequence charSequence) {
                String searchText = charSequence.toString().toLowerCase();
                List<Hike> filteredList = new ArrayList<>();

                if (searchText.isEmpty()) {
                    filteredList.addAll(hikeSearch);
                } else {
                    for (Hike hike : hikeSearch) {
                        if (hike.getName().toLowerCase().contains(searchText)) {
                            filteredList.add(hike);
                        }
                    }
                }

                FilterResults filterResults = new FilterResults();
                filterResults.values = filteredList;
                return filterResults;
            }

            @Override
            protected void publishResults(CharSequence charSequence, FilterResults filterResults) {
                hikes = (List<Hike>) filterResults.values;
                notifyDataSetChanged();
            }
        };
    }
}
