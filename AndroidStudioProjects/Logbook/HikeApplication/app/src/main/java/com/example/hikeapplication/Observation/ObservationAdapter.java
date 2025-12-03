package com.example.hikeapplication.Observation;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hikeapplication.ConnectDb;
import com.example.hikeapplication.R;

import java.util.List;

public class ObservationAdapter extends RecyclerView.Adapter<ObservationAdapter.MyViewHolder> {

    private final Context context;
    private final Activity activity;
    private final List<Observation> observations;

    public ObservationAdapter(Activity activity, Context context, List<Observation> observations) {
        this.activity = activity;
        this.context = context;
        this.observations = observations;
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {
        TextView nameObservation;
        Button buttonDelete, buttonMore;
        LinearLayout mainLayout;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            nameObservation = itemView.findViewById(R.id.nameObservation);
            mainLayout = itemView.findViewById(R.id.mainLayoutObservations);
            buttonDelete = itemView.findViewById(R.id.buttonDelete);
            buttonMore = itemView.findViewById(R.id.buttonEdit);
        }
    }

    @NonNull
    @Override
    public ObservationAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.row_observations, parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ObservationAdapter.MyViewHolder holder, int position) {
        Observation observation = observations.get(position);
        holder.nameObservation.setText(observation.getObservation());

        holder.buttonDelete.setOnClickListener(v ->
                confirmDelete(observation.getId(), observation.getObservation())
        );

        holder.buttonMore.setOnClickListener(v -> {
            Intent intent = new Intent(activity, EditObservationActivity.class);
            intent.putExtra("observation_id", observation.getId());
            intent.putExtra("name", observation.getObservation());
            intent.putExtra("time", observation.getTime());
            intent.putExtra("comment", observation.getComment());
            activity.startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return observations.size();
    }

    private void confirmDelete(int id, String name) {
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle("Delete observation " + name + "?");
        builder.setMessage("Are you sure you want to delete this observation?");
        builder.setPositiveButton("Yes", (dialog, which) -> {
            ConnectDb db = new ConnectDb(activity);
            db.deleteObservation(String.valueOf(id));
            Intent intent = activity.getIntent();
            activity.finish();
            activity.startActivity(intent);
        });
        builder.setNegativeButton("No", (dialog, which) -> dialog.dismiss());
        builder.create().show();
    }
}
