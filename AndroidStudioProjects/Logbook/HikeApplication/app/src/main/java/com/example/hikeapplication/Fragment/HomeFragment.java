package com.example.hikeapplication.Fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hikeapplication.ConnectDb;
import com.example.hikeapplication.Hike.Hike;
import com.example.hikeapplication.Hike.HikeAdapter;
import com.example.hikeapplication.R;

import java.util.ArrayList;
import java.util.List;

public class HomeFragment extends Fragment {

    private RecyclerView recyclerView;
    private HikeAdapter hikeAdapter;
    private List<Hike> hikeList = new ArrayList<>();
    private ConnectDb db;
    private Button buttonDeleteAll;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_home, container, false);

        recyclerView = view.findViewById(R.id.recyclerViewHike);
        buttonDeleteAll = view.findViewById(R.id.buttonDeleteAll);

        db = new ConnectDb(getActivity());

        loadHikes();

        hikeAdapter = new HikeAdapter(getActivity(), getActivity(), hikeList);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        recyclerView.setAdapter(hikeAdapter);

        buttonDeleteAll.setOnClickListener(v -> confirmDeleteAll());

        return view;
    }

    private void loadHikes() {
        hikeList.clear();
        List<Hike> temp = db.getHike();
        if (temp != null && !temp.isEmpty()) {
            hikeList.addAll(temp);
        } else {
            Toast.makeText(getActivity(), "No hikes found", Toast.LENGTH_SHORT).show();
        }
    }

    private void confirmDeleteAll() {
        new androidx.appcompat.app.AlertDialog.Builder(getContext())
                .setTitle("Delete all hikes?")
                .setMessage("Are you sure you want to delete all hikes?")
                .setPositiveButton("Yes", (dialog, which) -> {
                    db.deleteAllHike();
                    loadHikes();
                    hikeAdapter.notifyDataSetChanged();
                })
                .setNegativeButton("No", null)
                .show();
    }
}
